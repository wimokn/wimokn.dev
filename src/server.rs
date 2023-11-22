use rocket::fs::{relative, FileServer};
use rocket::{Build, Rocket};
use rocket_dyn_templates::Template;

use crate::routes::routes;

//#[launch]
pub fn start() -> Rocket<Build> {
    let (routes, catchers) = routes();
    rocket::build()
        .mount("/", routes)
        .mount("/css", FileServer::from(relative!("static/css")))
        .mount("/js", FileServer::from(relative!("static/js")))
        // .mount("/images", FileServer::from(relative!("static/images")))
        .mount("/favicons", FileServer::from(relative!("static/favicons")))
        .register("/", catchers)
        .attach(Template::fairing())
}
