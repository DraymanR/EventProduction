'use client'
import React, { useState } from 'react';
import LoginWithPassword from '@/app/component/users/register/loginWithPassword';
import EnterCodeFromEmail from '@/app/component/users/register/enterCodeFromEmail';
import { forgetPassword } from '@/app/services/user/registerUser';
import Register from './register';
import ResetPassword from '@/app/component/users/register/newPassword';
import '@/app/globals.css'


const Login: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<'LoginWithPassword' | 'newPassword' | 'EnterCodeFromEmail' | 'newUser'>('LoginWithPassword');
    const [errorMessage, setErrorMessage] = useState('');
    const [codeFromEmail, setCodeFromEmail] = useState('');
    const [userEmail, setUserFromEmail] = useState('');


    const handleForgetPassword = async (email: string) => {
        // setErrorMessage('');
        try {
            const result = await forgetPassword(email);
            setUserFromEmail(email)
            console.log(result);
            // setCodeFromEmail(result.OTP);
            setErrorMessage('');
            setCurrentStep('EnterCodeFromEmail');
        } catch (error) {
            setErrorMessage('Failed to send the code.');
            console.error(error);

        }
    };

    return (
        <div>
            {currentStep === 'LoginWithPassword' && (
                <LoginWithPassword onForgetPassword={handleForgetPassword} onNewUser={() => { setErrorMessage(''); setCurrentStep('newUser') }} />
            )}
            {currentStep == 'EnterCodeFromEmail' && (
                <EnterCodeFromEmail onBack={(currentStep: 'LoginWithPassword' | 'newPassword', myCodeFromEmail: string) => { setCodeFromEmail(myCodeFromEmail); setErrorMessage(''); setCurrentStep(currentStep) }} />
            )}
            {currentStep == 'newPassword' && (
                <ResetPassword otp={codeFromEmail} email={userEmail} />
            )}
            {currentStep === 'newUser' && (
                <Register onBack={() => { setErrorMessage(''); setCurrentStep('LoginWithPassword') }} />
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

        </div>
    );
};

export default Login;
