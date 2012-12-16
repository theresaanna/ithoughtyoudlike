Urls = new Meteor.Collection('urls');

if (Meteor.isClient) {
  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email']
    }
  });

  Template.linkForm.events({
    // submit a new link
    'click #go' : function() {
        var url, email;
        url = $('#url').attr('value');
        email = $('#email').attr('value');

        Urls.insert({url: url, email: email});

        if (Meteor.user()) {
          Feedback.pop('Thanks!');
        }
        else {
          Feedback.pop('Please login to send a link');
        }
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}

Feedback = {
  pop: function() {
    
  }
};
