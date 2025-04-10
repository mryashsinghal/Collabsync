import Message from '../models/Message.js';

// Get all messages for a topic
const getMessages = async (req, res) => { 
  try {
    const messages = await Message.find({ projectId: req.params.projectId });
    res.status(200).json(messages);
  } catch (err) {
    res.status(400).json({ message: 'Error fetching messages', error: err });
  }
};

export default getMessages;
