const express = require("express");
const path = require("path");
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { body, param, validationResult } from "express-validator";

const app = express();
const PORT = process.env.PORT || 3000;

/* ----------------------------- In-memory data ----------------------------- */
let postSeq = 1,
  commentSeq = 1;
const posts = []; // {id, title, content, tags[]}
const comments = []; // {id, postId, content, email}

/* ------------------------------ Middlewares -------------------------------- */

// JSON body parser
app.use(express.json());

// 1) Request/response logger with execution time
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  res.on("finish", () => {
    const ms = Number((process.hrtime.bigint() - start) / 1000000n);
    const ts = new Date().toISOString();
    console.log(
      `[${ts}] ${req.method} ${req.originalUrl} -> ${res.statusCode} ${ms}ms`
    );
  });
  next();
});

// 2) Simple rate limit: max 10 requests/IP/min
const hits = new Map();
app.use((req, res, next) => {
  const now = Date.now();
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  const windowMs = 60 * 1000;
  const arr = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  if (arr.length >= 10) {
    return res
      .status(429)
      .json({ success: false, error: "Rate limit exceeded (10 req/min)" });
  }
  arr.push(now);
  hits.set(ip, arr);
  next();
});

// 3) Content-Type validation for POST/PUT (must be application/json)
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const ct = req.headers["content-type"] || "";
    if (!ct.toLowerCase().startsWith("application/json")) {
      return res.status(415).json({
        success: false,
        error: "Content-Type must be application/json",
      });
    }
  }
  next();
});

// 4) Response formatter: attach helpers
app.use((req, res, next) => {
  res.ok = (data, status = 200) =>
    res.status(status).json({ success: true, data });
  res.fail = (status, error, details) =>
    res.status(status).json({ success: false, error, details });
  next();
});

/* ------------------------------ AJV (Posts) -------------------------------- */

const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

const postSchema = {
  type: "object",
  additionalProperties: false,
  required: ["title", "content"],
  properties: {
    title: { type: "string", minLength: 5, maxLength: 100 },
    content: { type: "string", minLength: 10, maxLength: 1000 },
    tags: {
      type: "array",
      items: { type: "string", minLength: 1, maxLength: 50 },
      uniqueItems: true,
      default: [],
    },
  },
};
const validatePost = ajv.compile(postSchema);

/* --------------------------------- Routes ---------------------------------- */

// POST /posts  (AJV validation)
app.post("/posts", (req, res) => {
  const isValid = validatePost(req.body);
  if (!isValid) {
    return res.fail(400, "Post validation failed", validatePost.errors);
  }
  const post = { id: postSeq++, ...req.body, tags: req.body.tags ?? [] };
  posts.push(post);
  res.ok(post, 201);
});

// GET /posts (no validation)
app.get("/posts", (_req, res) => res.ok(posts));

/* ----------- express-validator (comments) + post existence check ----------- */

// Utility: ensure post exists
const ensurePostExists = (req, _res, next) => {
  const postId = Number(req.params.postId);
  const post = posts.find((p) => p.id === postId);
  if (!post) return next({ status: 404, message: "Post not found" });
  req.post = post;
  next();
};

// POST /posts/:postId/comments
app.post(
  "/posts/:postId/comments",
  param("postId").isInt({ min: 1 }).toInt(),
  body("content").isString().isLength({ min: 5, max: 500 }),
  body("email").isEmail().normalizeEmail(),
  ensurePostExists,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.fail(400, "Comment validation failed", errors.array());

    const comment = {
      id: commentSeq++,
      postId: req.post.id,
      content: req.body.content,
      email: req.body.email,
    };
    comments.push(comment);
    return res.ok(comment, 201);
  }
);

// GET /posts/:postId/comments (ID validation only)
app.get(
  "/posts/:postId/comments",
  param("postId").isInt({ min: 1 }).toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.fail(400, "Invalid postId", errors.array());
    const list = comments.filter((c) => c.postId === Number(req.params.postId));
    // It's okay if a post doesn't exist here per spec; return empty list
    return res.ok(list);
  }
);

/* ---------------------------- Central error handler ------------------------ */
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.fail(status, err.message || "Internal Server Error");
});

/* --------------------------------- Start ----------------------------------- */
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
});

const port = 3000;
server.listen(port, function () {
  console.log(`Server is running on port ${port}`);
});
