import React, { useState } from 'react';
import Section from './Section';
import TextReveal from './TextReveal';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const InputField = ({ type, placeholder, label }) => (
    <div className="terminal-input-group">
        <span className="input-prompt">{">"}</span>
        <div style={{ width: '100%' }}>
            <label style={{ display: 'block', color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem' }}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    placeholder={placeholder}
                    className="terminal-input-base"
                />
            ) : (
                <input
                    type={type}
                    placeholder={placeholder}
                    className="terminal-input-base"
                />
            )}
        </div>
    </div>
);

const Contact = () => {
    const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SENT

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('SENDING');
        setTimeout(() => {
            setStatus('SENT');
        }, 2000);
    };

    return (
        <Section id="contact" className="container">
            <h2 className="section-title"><TextReveal text="Establish Uplink" /></h2>

            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                    </div>
                    <div className="terminal-title">
                        <Terminal size={14} style={{ marginRight: '8px' }} />
                        COMM_CHANNEL_V1.exe
                    </div>
                </div>

                <div className="terminal-body">
                    {status === 'SENT' ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="success-message"
                        >
                            <h3 style={{ color: 'var(--accent-amber)' }}>TRANSMISSION SUCCESSFUL</h3>
                            <p>Packet received. Expect acknowledgment shortly.</p>
                            <button onClick={() => setStatus('IDLE')} className="reset-btn">SEND ANOTHER</button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <p style={{ color: '#666', marginBottom: '1.5rem', fontFamily: 'monospace' }}>
                        // Enter your credentials to initialize connection...
                            </p>
                            <InputField type="text" placeholder="John Doe" label="IDENTIFIER (Name)" />
                            <InputField type="email" placeholder="john@example.com" label="RETURN_ADDRESS (Email)" />
                            <InputField type="textarea" placeholder="Project inquiry..." label="PAYLOAD (Message)" />

                            <motion.button
                                type="submit"
                                className="terminal-submit-btn"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {status === 'SENDING' ? 'TRANSMITTING...' : 'EXECUTE_SEND()'}
                            </motion.button>
                        </form>
                    )}
                </div>
            </div>
        </Section>
    );
};

export default Contact;
