package models

import scala.reflect.io.Path

case class SearchRequest(path: Path, q: String)
