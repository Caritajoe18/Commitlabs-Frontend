'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CommitmentHealthMetrics from '@/components/dashboard/CommitmentHealthMetrics';
import CommitmentDetailHeader from '@/components/Commitmentdetailheader';

// Mock commitment data (in production, this would come from contract/API)
const MOCK_COMMITMENTS = {
    '1': {
        id: 'CMT-ABC123',
        type: 'Balanced',
        amount: '100000',
        duration: 60,
        maxLoss: 8,
        status: 'active',
        createdAt: '2024-01-15',
        expiresAt: '2024-03-15',
        currentValue: '102000',
        complianceScore: 95,
        complianceData: [
            { date: 'Jan 15', complianceScore: 100 },
            { date: 'Jan 20', complianceScore: 98 },
            { date: 'Jan 25', complianceScore: 97 },
            { date: 'Jan 30', complianceScore: 95 },
            { date: 'Feb 4', complianceScore: 96 },
            { date: 'Feb 9', complianceScore: 95 },
            { date: 'Feb 14', complianceScore: 95 },
        ],
    },
    '2': {
        id: 'CMT-XYZ789',
        type: 'Safe',
        amount: '50000',
        duration: 30,
        maxLoss: 2,
        status: 'active',
        createdAt: '2024-01-20',
        expiresAt: '2024-02-20',
        currentValue: '50100',
        complianceScore: 100,
        complianceData: [
            { date: 'Jan 20', complianceScore: 100 },
            { date: 'Jan 23', complianceScore: 100 },
            { date: 'Jan 26', complianceScore: 100 },
            { date: 'Jan 29', complianceScore: 100 },
            { date: 'Feb 1', complianceScore: 100 },
            { date: 'Feb 4', complianceScore: 100 },
            { date: 'Feb 7', complianceScore: 100 },
        ],
    },
};

export default function CommitmentDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const router = useRouter();

    // Get commitment data based on ID
    const commitment = MOCK_COMMITMENTS[params.id as keyof typeof MOCK_COMMITMENTS];

    // If commitment not found, show error or redirect
    if (!commitment) {
        return (
            <main className="min-h-screen bg-[#050505] text-[#f5f5f7] p-4 sm:p-8 lg:p-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-12">
                        <h1 className="text-3xl font-bold mb-4">Commitment Not Found</h1>
                        <p className="text-[#99a1af] mb-6">
                            The commitment you&apos;re looking for doesn&apos;t exist or has been removed.
                        </p>
                        <button
                            onClick={() => router.push('/commitments')}
                            className="px-6 py-3 bg-[#0ff0fc]/10 border border-[#0ff0fc]/20 rounded-lg text-[#0ff0fc] hover:bg-[#0ff0fc]/20 transition-colors"
                        >
                            Back to My Commitments
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    const handleBack = () => {
        router.push('/commitments');
    };

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/commitments/${params.id}`;

        // Try using native Web Share API if available
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Commitment ${commitment.id}`,
                    text: `Check out my ${commitment.type} commitment on Commt`,
                    url: shareUrl,
                });
            } catch (error) {
                // User cancelled share or error occurred
                console.log('Share cancelled or failed:', error);
            }
        } else {
            // Fallback: Copy to clipboard
            try {
                await navigator.clipboard.writeText(shareUrl);
                // In production, use a toast notification instead of alert
                alert('Link copied to clipboard!');
            } catch (error) {
                console.error('Failed to copy link:', error);
                alert('Failed to copy link. Please try again.');
            }
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-[#f5f5f7] p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header Component */}
                <CommitmentDetailHeader
                    commitmentId={commitment.id}
                    statusLabel={commitment.status.charAt(0).toUpperCase() + commitment.status.slice(1)}
                    statusVariant={commitment.status}
                    onBack={handleBack}
                    onShare={handleShare}
                />

                {/* Commitment Overview Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
                        <div className="text-[#666] text-sm mb-1">Type</div>
                        <div className="text-[#f5f5f7] text-xl font-semibold">{commitment.type}</div>
                    </div>
                    <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
                        <div className="text-[#666] text-sm mb-1">Amount</div>
                        <div className="text-[#f5f5f7] text-xl font-semibold">{commitment.amount} XLM</div>
                    </div>
                    <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
                        <div className="text-[#666] text-sm mb-1">Current Value</div>
                        <div className="text-[#0ff0fc] text-xl font-semibold">{commitment.currentValue} XLM</div>
                    </div>
                    <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
                        <div className="text-[#666] text-sm mb-1">Max Loss</div>
                        <div className="text-[#f5f5f7] text-xl font-semibold">{commitment.maxLoss}%</div>
                    </div>
                </section>

                {/* Health Metrics Section */}
                <section>
                    <h2 className="text-2xl font-bold mb-4">Commitment Health</h2>
                    <CommitmentHealthMetrics complianceData={commitment.complianceData} />
                </section>

                {/* Additional Info Section */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Timeline</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-[#666]">Created:</span>
                                <span className="text-[#f5f5f7]">{commitment.createdAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#666]">Expires:</span>
                                <span className="text-[#f5f5f7]">{commitment.expiresAt}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#666]">Duration:</span>
                                <span className="text-[#f5f5f7]">{commitment.duration} days</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-[#0a0a0a] border border-[#222] rounded-lg">
                        <h3 className="text-lg font-semibold mb-4">Performance</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-[#666]">Compliance Score:</span>
                                <span className="text-[#0ff0fc] font-semibold">{commitment.complianceScore}/100</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#666]">Gain/Loss:</span>
                                <span className="text-[#4ade80] font-semibold">
                                    +{(Number(commitment.currentValue) - Number(commitment.amount)).toLocaleString()} XLM
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#666]">ROI:</span>
                                <span className="text-[#4ade80] font-semibold">
                                    +{(((Number(commitment.currentValue) - Number(commitment.amount)) / Number(commitment.amount)) * 100).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}