global.PaymentRequest = require('react-native-payments').PaymentRequest;

// pay = () => {
//   const METHOD_DATA = [
//     {
//       supportedMethods: ['apple-pay'],
//       data: {
//         merchantIdentifier: 'merchant.pixelplux.rovxgamepad',
//         supportedNetworks: ['visa', 'mastercard', 'amex'],
//         countryCode: 'US',
//         currencyCode: 'USD'
//       }
//     }
//   ];
//   const DETAILS = {
//     id: 'basic-example',
//     displayItems: [
//       {
//         label: 'Movie Ticket',
//         amount: { currency: 'USD', value: '15.00' }
//       }
//     ],
//     total: {
//       label: 'Merchant Name',
//       amount: { currency: 'USD', value: '15.00' }
//     }
//   };

//   const options = {
//     // requestPayerName: true
//   };

//   const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS, options);

//   paymentRequest.show().then(paymentResponse => {
//     const { getPaymentToken } = paymentResponse.details;

//     return getPaymentToken().then(paymentToken => {
//       const {
//         ephemeralPublicKey,
//         encryptedMessage,
//         tag
//       } = paymentResponse.details;

//       return fetch('...', {
//         method: 'POST',
//         body: {
//           ephemeralPublicKey,
//           encryptedMessage,
//           tag
//         }
//       })
//         .then(res => res.json())
//         .then(successHandler)
//         .catch(errorHandler);
//     });
//   });
// };
