/* db collections */
LinkRecipients = new Meteor.Collection('linkRecipients');

/* client events and config */
if (Meteor.isClient) {
    Accounts.ui.config({
        requestPermissions: {
            facebook: ['email']
        }
    });

    Template.linkForm.events({
        // submit a new link
        'click #go' : function() {
                var url, email, desc, sender;
                url = $('#url').attr('value');
                email = $('#email').attr('value');
                desc = $('#desc').attr('value');
                sender = Meteor.user();

                if (sender) {
                    Feedback.pop('Thanks!', 'main');
                    LinkRecipients.insert({url: url, email: email, desc: desc, sender: sender});
                    // lookup target user
                    // ask if we should send a notification
                }
                else {
                    Feedback.pop('Please login to send a link', 'userMenu');
                }
        }
    });
}

/* server startup and input handling */
if (Meteor.isServer) {
    Meteor.startup(function () {

    });
}

/* custom */

/* Feedback handling */
Feedback = {         
    pop: function(msg, loc) {
        var domObj = $('#' + loc);
        domObj.text(msg); 
        domObj.fadeIn().delay(4000).fadeOut(); 
    }
};
