const User = require("../models/userModle");
const Session = require("../models/mentorSessionsModel");
const MentorSession = require('../models/mentorSessionsModel')
exports.Overview = async (req, res) => {
  try {

    const user = req.user 

    // console.log('user:', user)
    

    const usersOverview = await User.aggregate([
      {
        $facet: {
          usersOverview: [
            { $group: { _id: { role: "$role", department: "$department" }, count: { $sum: 1 } } }
          ],
          departmentUsers: [
            { $group: { _id: "$department", count: { $sum: 1 } } }
          ]
        }
      } ])


    const sessionStats = await Session.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);


    const departmentUsers = await User.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]);


    
    if (user.role === 'superadmin'){
      const sessionStats = await Session.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]);
    } else if(user.role === 'admin'){
      const sessionStats = await Session.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]);
    }

    res.json({ usersOverview, sessionStats, departmentUsers });

  } catch (error) {
    console.error("Error fetching overview:", error);
    res.status(500).json({ error: error.message });
  }
};
