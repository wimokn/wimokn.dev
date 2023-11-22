#[cfg(test)]
mod test {
    use rocket::http::Status;
    use rocket::local::blocking::Client;

    fn client() -> Client {
        use crate::server::start;
        Client::tracked(start()).expect("Failed to start!")
    }

    #[test]
    fn static_pages_should_200() {
        let routes = vec!["/", "/favicons/favicon.ico", "/css/style.css"];

        let client = client();
        for route in routes {
            let resp = client.get(route).dispatch();
            assert_eq!(resp.status(), Status::Ok);
        }
    }

    #[test]
    fn notfound_pages_should_404() {
        let routes = vec![
            "/aaaaaaa",
            "/aaaaaaa/bbbbbbbb",
            "/aaaaaaa/bbbbbbbb/cccccccccc",
        ];
        let client = client();
        for route in routes {
            let resp = client.get(route).dispatch();
            println!("{}", route);
            assert_eq!(resp.status(), Status::NotFound);
        }
    }

    #[test]
    fn internalservererror_page_should_500() {
        let client = client();
        let resp = client.get("/500").dispatch();
        assert_eq!(resp.status(), Status::InternalServerError);
    }
}
