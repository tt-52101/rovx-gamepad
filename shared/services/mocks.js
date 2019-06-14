import { sampleYachts } from './sample-data/sample_yachts';

export function UPLOAD_imageMock() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: [
            {
              schema: {
                publicUrl: 'https://source.unsplash.com/1024x768/?boats'
              }
            }
          ]
        }
      });
    }, 2500);
  });
}

export async function GET_YackMock() {
  return new Promise(resolve => {
    resolve(sampleYachts);
  });
}

export async function getYachts() {
  return {
    data: {
      items: sampleYachts
    }
  };
}

export async function postYacht(yacht) {
  sampleYachts.push(yacht);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: sampleYachts
        }
      });
    }, 3500);
  });
}

export async function mockFacebookLogin() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: [
            {
              user: {
                email: 'facebook@sample.com',
                id: 26,
                phone: '+932198948',
                firstname: 'Petros',
                lastname: 'Melikon'
              },
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdDJAeWFob28uY29tIiwiaWQiOjI2fSwia2V5Ijoibm9ybWFsLXVzZXIiLCJpYXQiOjE1NTIzMDQ1NTF9.Ootq9Hm6uEWKatncAkiSWqc-jHQ3PDtDP8RoQ4lp99w'
            }
          ]
        }
      });
    }, 3500);
  });
}

export async function loginEmail() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: [
            {
              email: 'weqwe@213213'
            }
          ]
        }
      });
    }, 1500);
  });
}

export async function SignUpEmail(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: [
            {
              user: {
                email: data.email,
                id: 26
              },
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdDJAeWFob28uY29tIiwiaWQiOjI2fSwia2V5Ijoibm9ybWFsLXVzZXIiLCJpYXQiOjE1NTIzMDQ1NTF9.Ootq9Hm6uEWKatncAkiSWqc-jHQ3PDtDP8RoQ4lp99w'
            }
          ]
        }
      });
    }, 1500);
  });
}

export async function EditProfile(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: [
            {
              user: { ...data, id: 26, email: 'sample@domain.com' },
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdDJAeWFob28uY29tIiwiaWQiOjI2fSwia2V5Ijoibm9ybWFsLXVzZXIiLCJpYXQiOjE1NTIzMDQ1NTF9.Ootq9Hm6uEWKatncAkiSWqc-jHQ3PDtDP8RoQ4lp99w'
            }
          ]
        }
      });
    }, 1500);
  });
}

export async function ChangeProfilePicture(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        data: {
          items: [
            {
              user: { ...data, id: 26, email: 'sample@domain.com' },
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoidGVzdDJAeWFob28uY29tIiwiaWQiOjI2fSwia2V5Ijoibm9ybWFsLXVzZXIiLCJpYXQiOjE1NTIzMDQ1NTF9.Ootq9Hm6uEWKatncAkiSWqc-jHQ3PDtDP8RoQ4lp99w'
            }
          ]
        }
      });
    }, 1500);
  });
}

export async function addToFav(id) {
  return {
    data: {
      items: [
        {
          id
        }
      ]
    }
  };
}
