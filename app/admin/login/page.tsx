'use client';

import { Suspense } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            if (!response.ok) {
                setMessage(data.error || 'Unable to sign in.');
                return;
            }

            router.push(searchParams.get('next') || '/admin');
            router.refresh();
        } catch {
            setMessage('Unable to sign in right now.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl">
                <Image src="/logo.svg" alt="BYC" width={120} height={40} className="mb-8" />
                <h1 className="text-3xl text-gray-900 mb-3">Staff Access</h1>
                <p className="text-gray-600 mb-8">Sign in to edit website content.</p>
                <label className="block mb-6">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Password</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
                        required
                    />
                </label>
                {message && <p className="text-sm text-red-600 mb-5">{message}</p>}
                <button type="submit" disabled={loading} className="btn btn-primary btn-lg w-full disabled:opacity-60">
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>
        </main>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<main className="min-h-screen bg-gray-950"></main>}>
            <AdminLoginForm />
        </Suspense>
    );
}
