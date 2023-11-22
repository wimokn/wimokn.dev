use rocket::http::Status;
use rocket::{Catcher, Route};
use rocket_dyn_templates::{context, Template};
use std::collections::HashMap;

#[get("/robots.txt")]
fn robots() -> &'static str {
    return "User-agent: *\r\nDisallow: /admin/";
}

#[get("/")]
fn index() -> Template {
    // let context = std::collections::HashMap::<String, String>::new();
    let mut context: HashMap<String, String> = HashMap::new();
    context.insert("title".to_string(), "{ portfolio }".to_string());
    context.insert("user".to_string(), "guest@wimokn.dev:~$".to_string());
    Template::render("index", &context)
}

#[get("/500")]
fn crash() -> Result<String, Status> {
    Err(Status::InternalServerError)
}

#[catch(404)]
fn err_404() -> Template {
    Template::render(
        "error/404",
        context! {
            title: "{ error_404 }",
        },
    )
}
#[catch(500)]
fn err_500() -> Template {
    Template::render(
        "error/500",
        context! {
            title: "{ error_500 }",
        },
    )
}

pub fn routes() -> (Vec<Route>, Vec<Catcher>) {
    (routes![robots, index, crash], catchers![err_404, err_500])
}
