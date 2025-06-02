const db = db.getSiblingDB("breezy_bdd");

db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password"],
        properties: {
          username: { bsonType: "string", description: "must be a string and is required" },
          email: { bsonType: "string", description: "must be a string and is required" },
          password: { bsonType: "string", description: "hashed password, required" },
          avatar: { bsonType: "string" },
          bio: { bsonType: "string" },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        }
      }
    }
  });
  
  db.createCollection("posts", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["author", "content"],
        properties: {
          author: { bsonType: "objectId", description: "User ID" },
          content: { bsonType: "string", description: "Post content" },
          image: { bsonType: "string" },
          likes: { bsonType: "array", items: { bsonType: "objectId" } },
          createdAt: { bsonType: "date" },
          updatedAt: { bsonType: "date" }
        }
      }
    }
  });

  db.createCollection("comments", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["author", "post", "content"],
        properties: {
          author: { bsonType: "objectId", description: "User ID" },
          post: { bsonType: "objectId", description: "Post ID" },
          content: { bsonType: "string" },
          createdAt: { bsonType: "date" }
        }
      }
    }
  });

  db.createCollection("follows", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["follower", "following"],
        properties: {
          follower: { bsonType: "objectId", description: "User who follows" },
          following: { bsonType: "objectId", description: "User being followed" },
          createdAt: { bsonType: "date" }
        }
      }
    }
  });

  const userId = ObjectId();
  db.users.insertOne({
    _id: userId,
    username: "breezy_dev",
    email: "dev@breezy.com",
    password: "hashedpassword",
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  const postId = ObjectId();
  db.posts.insertOne({
    _id: postId,
    author: userId,
    content: "Premier post sur Breezy !",
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  db.comments.insertOne({
    author: userId,
    post: postId,
    content: "Super post !",
    createdAt: new Date()
  });
  
  db.follows.insertOne({
    follower: userId,
    following: userId,
    createdAt: new Date()
  });
  