package actors

import akka.actor.{Props, ActorLogging, Actor}
import models.{SearchRequest, SearchResult, Query}
import play.api.Play.current
import scala.reflect.io.Path
import scala.concurrent.duration._
import akka.pattern.ask
import akka.util.Timeout
import play.api.libs.concurrent.Execution.Implicits._
import play.api.cache.Cache

class SearchActorSupervisor extends Actor with ActorLogging {

  /**
   * Max duration for the search of an individual file
   */
  implicit val timeout = Timeout(180, SECONDS)

  /**
   * Max duration for the search to complete
   */
  val totalTimeout = 180.seconds

  var totalFiles = 0
  var progress   = 1
  var results = Vector[SearchResult]()

  override def preStart() {
    log.info("Supervisor START")
    totalFiles = 0
    progress   = 1
  }

  override def postStop()  {
    log.info(s"Supervisor STOP")
  }

  override def receive = {

    case Query(q: String) =>

      totalFiles = 0
      progress   = 1

      log.info(s"""Starting search for "$q"...""")
      log.info(s"Listing files...")

      val now1 = System.currentTimeMillis()

      val files: Vector[Path] = Cache.getOrElse[Vector[Path]]("files")(
        throw new RuntimeException("Can't list the files")
      )

      totalFiles = files.size

      log.info(s"Got ${files.size} files in ${System.currentTimeMillis() - now1} ms")
      log.info("Starting search...")

      // Fire a search actor for each file
      files.foreach { path =>
        (context.actorOf(Props[SearchActor]) ? SearchRequest(path, q))
          .mapTo[Option[SearchResult]]
          .onSuccess{ case r: Option[SearchResult] =>
            progress = progress + 1
//            log.info(s"$progress / $totalFiles")
            r match {
              case Some(result) =>
                results = results :+ result
              case _ => // Do nothing
            }
          }
        }

    case "progress" =>
      val progressPercent = (progress.toFloat / totalFiles.toFloat * 100f).toInt
      log.info(s"Progress: $progressPercent%")
      sender ! progressPercent

    case "results" =>
      log.info("Results")
      sender ! results
      context.stop(self)

    case "cancel" =>
      log.info("Cancellation requested")
      context.stop(self)

  }


}
