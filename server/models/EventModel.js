const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    altPhone: {
      type: Number,
      required: true,
    },
    otp: {
      code: {
        type: String,
      },
      generatedAt: {
        type: Date,
      },
    },
    services: {
      type: String,
      required: true,
    },
    officeAddress: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      default: "avatar.png",
    },
    selectedPlan: {
      plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
      },
      expiry: {
        type: Date,
      },
    },
    post: [
      {
        location: {
          type: String,
        },
        media: {
          type: String,
        },
        description: {
          type: String,
        },
        likes: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            count:{
                type:Number,
                default:0
            }
          },
        ],
        comments: [
          {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            count:{
                type:Number,
                default:0
            },
            text:{
                type:String
            }
          },
        ],
      },
    ],
    story: [
      {
        media: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    jobPosts: [
      {
        jobTitle: {
          type: String,
        },
        jobType: {
          type: String,
        },
        timing: {
          type: String,
        },
        skillsRequired: {
          type: String,
        },
        vaccancies: {
          type: Number,
        },
        jobDescription: {
          type: String,
        },
        experience: {
          type: String,
        },
        expires: {
          type: Date,
        },
        isBlocked: {
          type: Boolean,
        },
        likes: {
          type: Number,
          default: 0,
        },
      },
    ],
    acceptedRequests: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event.jobPost",
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("event", eventSchema);
module.exports = eventModel;
