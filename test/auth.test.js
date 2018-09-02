const request = require("request");
const expect = require("chai").expect;
const config = require("config");

const url = config.get("test_url");
const option = {
  method: "POST",
  url: url + "/api/auth",
  headers: {
    "content-type": "application/json"
  }
};

describe("Authentication Test", () => {
  it("should return status code 400 if no username and password is sent", done => {
    request(
      {
        ...option,
        body: JSON.stringify({
          username: "",
          password: ""
        })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        done();
      }
    );
  });
  it("should return status code 400 if only username is sent", done => {
    request(
      {
        ...option,
        body: JSON.stringify({
          username: "username",
          password: ""
        })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        done();
      }
    );
  });

  it("should return status code 400 if only password is sent", done => {
    request(
      {
        ...option,
        body: JSON.stringify({
          username: "",
          password: "password"
        })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        done();
      }
    );
  });

  it("should return status code of 200 if all is sent properly ", done => {
    request(
      {
        ...option,
        body: JSON.stringify({
          username: "username",
          password: "password"
        })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });

  it("should set the header propery with the token if all is sent properly", done => {
    request(
      {
        ...option,
        body: JSON.stringify({
          username: "username",
          password: "password"
        })
      },
      (err, res, body) => {
        expect(res.headers["x-auth-token"]).to.not.be.empty;
        done();
      }
    );
  });
});
