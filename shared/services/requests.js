import {
  getYachts,
  GET_YackMock,
  postYacht,
  UPLOAD_imageMock,
  addToFav,
  loginEmail,
  SignUpEmail,
  EditProfile,
  mockFacebookLogin,
  ChangeProfilePicture
} from './mocks';
import { Store } from './store';

import {
  asEntities,
  showMessage,
  validateUser,
  ValidateUserSignUp,
  ValidateEditProfile,
  unexpectedError
} from '../common';
// import { login } from './oauth';
import { GET, POST, usingMock } from './network';

export async function AuthUsingFacebook() {
  try {
    if (!usingMock) {
      const { clientID, accessToken } = await login();
      const facebookAuth = {
        facebook_id: clientID,
        facebook_token: accessToken
      };
      return POST('facebook/auth', facebookAuth);
    }
    return mockFacebookLogin();
  } catch (error) {
    unexpectedError(error);
  }
}

export async function YachtPost(yacht) {
  try {
    if (usingMock) {
      return postYacht(yacht);
    }
    return POST('yacht', yacht);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function LoginByPhone(phone, activation_code) {
  try {
    if (activation_code) {
      return POST('xlist/mobile/authenticate', { phone, activation_code });
    }
    return POST('xlist/mobile/signup', { phone });
  } catch (error) {
    unexpectedError(error);
  }
}

export async function LoginEmailPost(data) {
  const errors = validateUser(data);
  if (errors && errors.length) {
    return {
      error: {
        message: 'You need to review form and fix issues',
        errors
      }
    };
  }
  try {
    if (usingMock) {
      return loginEmail();
    }
    return POST('user/signin', data);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function SignUpEmailPost(data) {
  const errors = ValidateUserSignUp(data);
  if (errors && errors.length) {
    return {
      error: {
        message: 'You need to review form and fix issues',
        errors
      }
    };
  }
  try {
    if (usingMock) {
      return SignUpEmail(data);
    }
    return POST('user/signup', data);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function EditProfilePost(data) {
  const errors = ValidateEditProfile(data);
  if (errors && errors.length) {
    return {
      error: {
        message: 'You need to review form and fix issues',
        errors
      }
    };
  }
  try {
    if (usingMock) {
      return ChangeProfilePicture(data);
    }
    return POST('user/settings', data);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function ChangeProfilePicturePost(data) {
  try {
    if (usingMock) {
      return EditProfile(data);
    }
    return POST('user/settings', data);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function Search(params) {
  const { viewport } = params;
  let V = '';
  if (viewport && viewport[0] && viewport[1]) {
    V = JSON.stringify(viewport)
      .replace('[', '')
      .replace(']', '');
  }

  const qs = {
    ...params,
    viewport: V
  };
  try {
    if (usingMock) {
      return getYachts(params);
    }

    return GET('yacht/query', qs);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function YachtDetails() {
  try {
    if (usingMock) {
      return await GET_YackMock();
    }
  } catch (error) {
    unexpectedError(error);
  }
}

export function UploadCropPickerImage(image) {
  try {
    if (!usingMock) {
      return POST('ngmedia/upload', {
        file: `data:${image.mime};base64,${image.data}`
      });
    }
    return UPLOAD_imageMock(image);
  } catch (error) {
    unexpectedError(error);
  }
}

export async function UserYachts() {
  let result;
  if (!usingMock) {
    result = await GET('yachts');
  } else {
    result = await getYachts();
  }
  const entities = asEntities(result);
  if (entities) {
    Store.userVessels.next(entities);
  }
}

export async function MyFavorites() {
  try {
    if (!usingMock) {
      return GET('yacht-favorites');
    }
    return getYachts();
  } catch (error) {
    if (error.message) {
      showMessage('Yacht details error', error.message, 'OK');
    } else {
      showMessage(
        'Yacht details error',
        'Unexpected error occurred, please try again',
        'OK'
      );
    }
  }
}

export async function AddFavorite(yacht_id) {
  try {
    if (!usingMock) {
      return POST(`yacht-favorite/${yacht_id}`);
    }
    return addToFav(yacht_id);
  } catch (error) {
    unexpectedError(error);
  }
}
