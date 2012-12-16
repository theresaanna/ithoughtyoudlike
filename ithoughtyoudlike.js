Urls = new Meteor.Collection('urls');

if (Meteor.isClient) {
  Accounts.ui.config({
    requestPermissions: {
      facebook: ['email']
    }
  });

  Template.hello.events({
    'click #go' : function() {
        var url, email;
        url = $('#url').attr('value');
        email = $('#email').attr('value');

        Urls.insert({url: url, email: email});

        if (Meteor.user()) {
            console.log('thanks');
        }
        else {
            console.log('thanks. want to sign up?');
        }

    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
