const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initial Google OAuth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Google OAuth callback
router.get("/auth/google/callback", (req, res, next) => {
    passport.authenticate("google", (err, data, info) => {
        if (err) {
            return next(err);
        }
        if (!data.user) {
            return res.redirect("http://localhost:3000/login");
        }
        
        const token = data.token;

        if (data.user.isNewUser) {
            return res.redirect(`http://localhost:3000/purpose?token=${token}`);
        } else {
            return res.redirect(`http://localhost:3000/home?token=${token}`);
        }
    })(req, res, next);
});

router.get("/login/success", async (req, res) => {
    if (req.user) {
        res.status(200).json({ message: "User Logged In", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized" });
    }
});

router.get("/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect("http://localhost:3000");
    });
});

module.exports = router;