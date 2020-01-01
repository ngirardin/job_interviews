package models

import scala.reflect.io.Path

case class SearchResult(

  file: Path,

  //Line number, occurrence
  matches: Vector[(Int, Int)]

)
