package controllers

import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import play.api.libs.concurrent.Akka
import play.api.Play.current
import models.{SearchResult, Query}
import scala.concurrent.Await
import akka.pattern.ask
import java.util.concurrent.TimeUnit
import akka.util.Timeout
import scala.concurrent.duration._
import play.api.libs.json._
import play.api.Play
import scala.io.Source
import scala.reflect.io.File

object Application extends Controller {

  lazy val rootConfig = Play.configuration.getString("root").get

  def searchSupervisorActor = Akka.system.actorSelection("/user/searchSupervisor")

  /**
   * Max duration for the progress result
   */
  implicit val timeout = Timeout(120, TimeUnit.SECONDS)

  /**
   * Max duration for awaiting the progress results
   */
  val awaitTimeout = 60.seconds

  def index = Action {
    Ok(views.html.index())
  }

  def search = Action { implicit request =>

    // Get the query param
    Form(
      mapping(
        "q" -> nonEmptyText
      )(Query.apply)(Query.unapply)
    ).bindFromRequest.fold(

      // Invalid request parameter
      formWithError => {
        BadRequest("Missing query")
      },

      // Valid query
      q => {
        searchSupervisorActor ! q
        Ok("OK")
      }

    )

  }

  def progress = Action {

    val progress = Await.result((searchSupervisorActor ? "progress").mapTo[Int], awaitTimeout)
    Ok(
      Json.obj("progress" -> progress.toString)
    )

  }

  def cancel = Action {

    searchSupervisorActor ! "cancel"
    Ok("Cancelled")

  }

  def results = Action {

    val results: Vector[SearchResult] = Await.result(
      (searchSupervisorActor ? "results").mapTo[Vector[SearchResult]], awaitTimeout
    )

    Ok(
      Json.obj(
        "results" -> results.map(r =>
          Json.obj(
            //"path"        -> s"${r.file.path.stripPrefix(rootConfig)}/${r.file.name}",
            "path"        -> s"${r.file.path}",
            "occurrences" -> r.matches.map(_._2).sum
          )
        )
      )
    )

  }

  def serveFile = Action { implicit request =>

    case class ServePath(path: String)

    Form(
      mapping(
        "path" -> nonEmptyText
      )(ServePath.apply)(ServePath.unapply)
    ).bindFromRequest.fold(

        // Invalid request parameter
        formWithError => {
          BadRequest("Missing path")
        },

        // Valid query
        valid => {
          Ok.sendFile(
            content = new java.io.File(valid.path),
            inline = true
          )
        }
      )

  }

}
