const request = require("request");
const expect = require("chai").expect;
const config = require("config");

const testUrl = config.get("test_url");
const option = {
  method: "POST",
  url: testUrl + "/api/patch",
  headers: {
    "content-type": "application/json"
  }
};

let token;

before(done => {
  request(
    {
      ...option,
      url: testUrl + "/api/auth",
      body: JSON.stringify({ username: "username", password: "password" })
    },
    (err, res, body) => {
      token = "bearer " + res.headers["x-auth-token"];
    }
  );
  done();
});

describe("Patch Test", () => {
  // should not allow authenticated user not to access this endpoint
  it("should not allow unauthorized user to access this endpoint", done => {
    request(
      {
        ...option,
        body: JSON.stringify({ data: {}, patch: {} })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(401);
        expect(body).to.include("Not Authorized to access");
        done();
      }
    );
  });
  // should return bad request if none of the parameters are set
  it("should return bad request if no parameters are set", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({ data: null, patch: null })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        expect(body).to.include("Invalid Parameters");
        done();
      }
    );
  });
  // should return bad request if only data is set
  it("should return bad request if no parameters are set", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({ data: {}, patch: null })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        expect(body).to.include("Invalid Parameters");
        done();
      }
    );
  });
  // should return bad request if only patch is set
  it("should return bad request if no parameters are set", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({ data: null, patch: {} })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(400);
        expect(body).to.include("Invalid Parameters");
        done();
      }
    );
  });
  // should return status ok with the data if all went well
  it("should return status ok with the data if all went well", done => {
    request(
      {
        ...option,
        headers: {
          "content-type": "application/json",
          authorization: token
        },
        body: JSON.stringify({
          data: { name: "john" },
          patch: { op: "add", path: "/name", value: "doe" }
        })
      },
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });
});
