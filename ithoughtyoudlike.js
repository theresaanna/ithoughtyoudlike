/* db collections */

/*
 * linkRecipient
 *      name
 *      email
 *          links {
 *              description
 *              url
 *              sender
 *          }
 */

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
                // retrieve form data
                url = $('#url').attr('value');
                email = $('#email').attr('value');
                desc = $('#desc').attr('value');
                sender = Meteor.user();

                // if the link sender is logged in
                if (sender) {
                    
                    LinkRecipients.insert({url: url, email: email, desc: desc, sender: sender}, Feedback.showLinkSubmissionResults);
                }
                // prompt to login
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
    /*
     * @param msg: string to display to user
     * @param loc: the id of the dom el to insert message into
     */
    pop: function(msg, loc) {
        var domObj = $('#' + loc);
        domObj.text(msg); 
        domObj.fadeIn().delay(4000).fadeOut(); 
    },

    /* callback for LinkRecipients.insert() */
    showLinkSubmissionResults: function(err) {
        var msg;

        if (err) {
            msg = "Erm, something went awry. Would you mind trying again?";
        }
        else {
            msg = "Saved! I'm sure they'll enjoy it.";
        }

        Feedback.pop(msg, 'main');
    }
};
