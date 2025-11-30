import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

class FeedbackService {
  // FEEDBACK SERVICES
  async GetFeedbacks({ book_id }) {
    try {
      let feedbacks = await Feedback.findAll({
        where: { book_ID: book_id },
        include: [
          {
            model: User,
            attributes: ["id", "email"],
          },
        ],
      });
      if (!feedbacks) {
        return null;
      }
      return feedbacks;
    } catch (error) {
      return { error };
    }
  }
  async GetFeedback({ user_ID, book_ID }) {
    try {
      let feedback = await Feedback.findOne({
        where: { user_ID: user_ID, book_ID: book_ID },
      });
      if (!feedback) {
        return { error: new Error("No feedback found for this user.") };
      }
      return feedback;
    } catch (error) {
      return { error };
    }
  }
  async createFeedback({ user_ID, book_ID, content, star }) {
    try {
      const newFeedback = await Feedback.create({
        user_ID: user_ID,
        book_ID: book_ID,
        content: content,
        star: star,
        created_at: new Date(),
      });
      return newFeedback;
    } catch (error) {
      console.error("Error creating feedback:", error);
      return null;
    }
  }
  async updateFeedback({ id, data }) {
    try {
      let feedback = await Feedback.findByPk(id);
      if (!feedback) {
        throw new Error("Feedback not found");
      }

      let updatedFeedback = await feedback.update(data);
      return updatedFeedback;
    } catch (error) {
      console.error("Error updating feedback:", error);
      return { error: error.message };
    }
  }
}

export default FeedbackService;
