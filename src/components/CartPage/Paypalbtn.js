import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
 
export default class MyApp extends React.Component {
    render() {
        const onSuccess = (payment) => {
            //clear the cart 
            this.props.clearCart();

            // redirect to home 
            this.props.history.push('/');
        }
 
        const onCancel = (data) => {
           
        }
 
        const onError = (err) => {
          
        }
 
        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'USD'; // or you can set this value from your props or state
        
 
        const client = {
            sandbox:    process.env.REACT_APP_PAYPAL_ID,
            production: 'YOUR-PRODUCTION-APP-ID',
        }
        
        return (
            <PaypalExpressBtn env={env} client={client} currency={currency} total={this.props.cartTotal} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
        );
    }
}