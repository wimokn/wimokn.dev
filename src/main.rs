#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use]
extern crate rocket;

#[cfg(test)]
#[path = "./tests/tests.rs"]
mod tests;

mod routes;
mod server;

#[rocket::main]
async fn main() {
    let _result = server::start().launch().await;
}
