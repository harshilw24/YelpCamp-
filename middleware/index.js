
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
    if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error","Campground not found!");
                    res.redirect("/campgrounds")
                } 
                else {
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    }
                    else{
                        req.flash("error","You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
    }
    else{
        req.flash("error", "You need to be logged in to that.")
        console.log("You need to be logged in.");
    }
}

middlewareObj.checkCommentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("/campgrounds")
            } 
            else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error","You don't have clearence.");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error","You need to be logged in.");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You have to be logged in to do that.");
    res.redirect("/login");
}

module.exports = middlewareObj;