const ConversationModel = require('../models/conversation');
const MessageModel = require('../models/message');



exports.addConversation = async (req, res) => {
    try{

    } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
}

exports.addConversation = async (req, res) => {
    try{
        let senderId =req.user._id;
        let {receiverId, message} = req.body;
        let ConvExist = await ConversationModel.findOne({ members: { $all: [senderId, receiverId] } });
        if(!ConvExist){
            let newConversation = new ConversationModel({ members: [senderId, receiverId] });
            await newConversation.save();
            let addMessage = new MessageModel({ sender: req.user._id, conversation: newConversation._id, message });
            await addMessage.save();
        } else{
            let addMessage = new MessageModel({ sender: req.user._id, conversation: ConvExist._id, message });
            await addMessage.save();
        }

        return res.status(201).json({ message: "Message sent successfully" });
    } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
}


exports.getConversation = async (req, res) => {
    try{
        let loggedinId = req.user._id;
        let conversations = await ConversationModel.find({ 
            members: { $in: [loggedinId] } 
        }).populate('members', '-password').sort({ createdAt: -1 });

        return res.status(200).json({ message:"Fetched Successfully", conversations:conversations });
    } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
}