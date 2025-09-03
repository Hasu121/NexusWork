const MessageModel = require('../models/message');


exports.sendMessage = async (req, res) => {
    try{
        let { conversation, message, picture } = req.body;
        let addMessage = new MessageModel({ sender: req.user._id, conversation, message, picture });
        await addMessage.save()
        let populatedMessage = await addMessage.populate('sender');
        return res.status(201).json({ populatedMessage });
    } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
}


exports.getMessage = async (req, res) => {
    try{
        let { conversationId } = req.params;
        let message = await MessageModel.find({ conversation: conversationId }).populate('sender');
        return res.status(200).json({ messages: "Fetched messages successfully", message });
    }catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
}

exports.editMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const msg = await MessageModel.findById(id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    if (msg.sender.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Unauthorized' });
    msg.message = message;
    await msg.save();
    return res.status(200).json({ success: true, message: 'Message updated', msg });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};


exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await MessageModel.findById(id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    if (msg.sender.toString() !== req.user._id.toString()) return res.status(403).json({ error: 'Unauthorized' });
    await msg.deleteOne();
    return res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};