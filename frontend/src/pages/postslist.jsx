import postimg from "../assets/forestfire.jpg";
import jaimin from "../assets/jaimin.png";
import sid from "../assets/sid.png";

const initialPosts = [
    {
      userId: {
        _id: "user101",
        firstName: "Jaimin",
        lastName: "Viramgama",
        profileUrl: jaimin,
        location: "Tirupati",
      },
      createdAt: "2024-10-07T12:55:00Z",
      description: "Breaking News: Rajasthan hit by a massive cyclone...",
      image: postimg,
      likes: ["user100", "user102"],
      location: "Tirupati",
      comments: [
        {
          _id: "comment1",
          userId: {
            _id: "user102",
            firstName: "Siddhant",
            lastName: "Chatse",
            profileUrl: sid,
          },
          createdAt: "2024-10-06T13:00:00Z",
          comment: "Great post!",
          likes: [],
          replies: [],
        },
      ],
    },
    {
      userId: {
        _id: "user102",
        firstName: "Siddhant",
        lastName: "Chatse",
        profileUrl: sid,
        location: "Mumbai",
      },
      createdAt: "2024-10-08T10:00:00Z",
      description: "Technology Update: New smartphone launches with cutting-edge features.",
      image: postimg,
      likes: ["user101"],
      location: "Mumbai",
      comments: [
        {
          _id: "comment2",
          userId: {
            _id: "user101",
            firstName: "Jaimin",
            lastName: "Viramgama",
            profileUrl: jaimin,
          },
          createdAt: "2024-10-08T11:00:00Z",
          comment: "Can't wait to check it out!",
          likes: [],
          replies: [],
        },
      ],
    },
    {
      userId: {
        _id: "user103",
        firstName: "Anjali",
        lastName: "Mehta",
        profileUrl: "path/to/anjali.png", // Replace with actual image path
        location: "Delhi",
      },
      createdAt: "2024-10-08T14:30:00Z",
      description: "Travel Update: Exploring the hidden gems of Himachal Pradesh!",
      image: postimg,
      likes: ["user101", "user102"],
      location: "Delhi",
      comments: [
        {
          _id: "comment3",
          userId: {
            _id: "user104",
            firstName: "Rahul",
            lastName: "Kumar",
            profileUrl: "path/to/rahul.png", // Replace with actual image path
          },
          createdAt: "2024-10-08T15:00:00Z",
          comment: "Amazing! Can't wait to see your photos!",
          likes: [],
          replies: [],
        },
      ],
    },
    {
    userId: {
        _id: "user105",
        firstName: "Meera",
        lastName: "Sharma",
        profileUrl: "path/to/meera.png", // Replace with actual image path
        location: "Bangalore",
      },
      createdAt: "2024-10-09T09:30:00Z",
      description: "Just completed a marathon! Feeling accomplished and ready for the next challenge.",
      image: "path/to/marathon.jpg", // Replace with actual image path
      likes: ["user106", "user107"],
      location: "Bangalore",
      comments: [
        {
          _id: "comment4",
          userId: {
            _id: "user106",
            firstName: "Amit",
            lastName: "Verma",
            profileUrl: "path/to/amit.png", // Replace with actual image path
          },
          createdAt: "2024-10-09T10:00:00Z",
          comment: "Congratulations! That's an amazing achievement!",
          likes: [],
          replies: [],
        },
      ],
    },
    {
      userId: {
        _id: "user107",
        firstName: "Nisha",
        lastName: "Patel",
        profileUrl: "path/to/nisha.png", // Replace with actual image path
        location: "Hyderabad",
      },
      createdAt: "2024-10-09T11:15:00Z",
      description: "Just finished reading a great book on personal development. Highly recommend it!",
      image: "path/to/book.jpg", // Replace with actual image path
      likes: ["user105"],
      location: "Hyderabad",
      comments: [
        {
          _id: "comment5",
          userId: {
            _id: "user108",
            firstName: "Raj",
            lastName: "Singh",
            profileUrl: "path/to/raj.png", // Replace with actual image path
          },
          createdAt: "2024-10-09T12:00:00Z",
          comment: "Which book was it? I love recommendations!",
          likes: [],
          replies: [],
        },
      ],
    },
    {
      userId: {
        _id: "user109",
        firstName: "Kiran",
        lastName: "Kumar",
        profileUrl: "path/to/kiran.png", // Replace with actual image path
        location: "Chennai",
      },
      createdAt: "2024-10-09T14:45:00Z",
      description: "Excited for the upcoming tech conference! Can't wait to learn about the latest trends.",
      image: "path/to/conference.jpg", // Replace with actual image path
      likes: ["user105", "user106"],
      location: "Chennai",
      comments: [
        {
          _id: "comment6",
          userId: {
            _id: "user110",
            firstName: "Priya",
            lastName: "Iyer",
            profileUrl: "path/to/priya.png", // Replace with actual image path
          },
          createdAt: "2024-10-09T15:00:00Z",
          comment: "That sounds amazing! Are you going with anyone?",
          likes: [],
          replies: [],
        },
      ],
    },
  ];
export default initialPosts;  