const {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  GetGroupCommand,
  CreateGroupCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const cognitoIdentityServiceProvider = new CognitoIdentityProviderClient({});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async (event) => {
  let isAdmin = false
  const adminEmails = ['dabit3@gmail.com', 'lsujal41@gmail.com', 'lsujal81@yahoo.com']

  // If the user is one of the admins, set the isAdmin variable to true
  if (adminEmails.indexOf(event.request.userAttributes.email) !== -1) {
    isAdmin = true
  }

  const groupParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: process.env.GROUP,
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };

  if (isAdmin) {
    groupParams.GroupName = 'Admin',
    addUserParams.GroupName = 'Admin'
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoIdentityServiceProvider.send(new GetGroupCommand(groupParams));
  } catch (e) {
    await cognitoIdentityServiceProvider.send(new CreateGroupCommand(groupParams));
  }
  /**
   * Then, add the user to the group.
   */
  await cognitoIdentityServiceProvider.send(new AdminAddUserToGroupCommand(addUserParams));

  return event;
  }
  else {
    return event;
  }
};
