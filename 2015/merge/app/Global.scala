import actors.SearchActorSupervisor
import akka.actor.Props
import play.api.cache.Cache
import play.api.{Logger, Play, Application, GlobalSettings}
import play.libs.Akka
import scala.reflect.io.{Directory, Path}
import play.api.Play.current

object Global extends GlobalSettings {

  override def onStart(app: Application) {

    Akka.system.actorOf(Props[SearchActorSupervisor], name = "searchSupervisor")

    // Cache the file list to avoid hanging the actor while listing the threads
    Logger.info(s"Root search folder: $root")
    Logger.info(s"Caching the file list to speed-up search (it's not cheating, isn't it? :)")
    Cache.set("files", listFiles)
    Logger.info("Caching done")

  }

  lazy val root : Directory = {
    val rootConfig = Play.configuration.getString("root").getOrElse(
      throw new RuntimeException("Missing 'root' config")
    )
    Directory(rootConfig)
  }

  /**
   * @return All the files under the root folder with the extension xml, txt, js or java.
   */
  private def listFiles : Vector[Path] = {

    root.walkFilter{ path =>
      path.isDirectory || (path.extension match {
        case "xml" | "txt" | "js" | "java" => true
        case noMatch                       => false
      })
    }.toVector

  }

}
