package actors

import akka.actor.{ActorLogging, Actor}
import scala.reflect.io.Path
import scala.io.Source
import models.{SearchResult, SearchRequest}

class SearchActor extends Actor with ActorLogging {

  /*
  override def postStop(): Unit = {
    log.info("STOP")
  }
  */

  override def receive = {

    case searchRequest: SearchRequest =>

      val now = System.currentTimeMillis()

      val path = searchRequest.path
      val file = path.jfile

      try {

        val result: Vector[(Int, Int)] = Source.fromFile(file)
          .getLines()
          .toIterable // Needed to unzip
          .zipWithIndex
          .map { case (line: String, i: Int) =>
            (i + 1, searchRequest.q.r.findAllMatchIn(line).length)
          }
          .filter { case (line: Int, occurrences: Int) =>
            occurrences > 1
          }
          .toVector


        val size = (file.length() / 1024)

        val optionResult: Option[SearchResult] = result.size match {

          case 0 =>

            //log.info(s"$path ($size KB) found nothing in ${System.currentTimeMillis() - now} ms")
            None

          case _ =>

            val occurrences = result.map(_._2).sum
            val lines       = result.size

            //log.info(s"$path ($size KB) found $occurrences occurrences on $lines lines in ${System.currentTimeMillis() - now} ms")

            Option(SearchResult(path, result))

        }

        sender ! optionResult

      } catch {

        case e: Exception =>
          log.error(s"${e.getMessage} for ${path.name} (${file.length()} bytes)")
          sender ! None

      } finally {

        context.stop(self)

      }

  }

}
