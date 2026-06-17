import React, { useState, useEffect } from 'react';
import { Shield, Lock, ArrowRight, XCircle, Loader2 } from 'lucide-react';

interface AdminAccessGuardProps {
    children: React.ReactNode;
}

const AdminAccessGuard: React.FC<AdminAccessGuardProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const ADMIN_CODE = "8902"; // You can change this to your preferred code

    useEffect(() => {
        const authStatus = sessionStorage.getItem('admin_authenticated');
        if (authStatus === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate a slight delay for a premium feel
        setTimeout(() => {
            if (code === ADMIN_CODE) {
                sessionStorage.setItem('admin_authenticated', 'true');
                setIsAuthenticated(true);
            } else {
                setError('Invalid Access Code');
                setCode('');
            }
            setIsLoading(false);
        }, 800);
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-6 font-sans">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-[24px] shadow-2xl shadow-violet-600/20 mb-6 group transition-transform hover:scale-110 duration-500">
                        <Shield size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Restricted Access</h1>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-[0.2em]">Secure Administrator Portal</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Enter Admin Pin</label>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500">
                                    <Lock size={18} />
                                </div>
                                <input 
                                    type="password"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="••••"
                                    maxLength={4}
                                    className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-5 pl-14 pr-6 text-2xl font-black tracking-[1em] text-white outline-none focus:bg-white/10 focus:border-violet-500/50 transition-all text-center`}
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 text-red-500 mt-2 ml-1 animate-bounce">
                                    <XCircle size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">{error}</span>
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading || code.length < 4}
                            className="w-full bg-white text-black py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-violet-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-3 group"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <>
                                    Authorize Session
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Info */}
                <p className="mt-8 text-center text-[9px] text-gray-600 font-medium uppercase tracking-[0.2em]">
                    Unauthorized access attempts are logged and monitored.
                </p>
            </div>
        </div>
    );
};

export default AdminAccessGuard;
