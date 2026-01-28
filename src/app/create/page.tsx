'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import styles from './page.module.css'
import CreateCommitmentStepConfigure from '@/components/CreateCommitmentStepConfigure'

type CommitmentType = 'safe' | 'balanced' | 'aggressive'
type Step = 1 | 2 | 3

export default function CreateCommitment() {
  const [currentStep, setCurrentStep] = useState<Step>(2) // Start at step 2 for demo
  const [commitmentType, setCommitmentType] = useState<CommitmentType>('balanced')
  const [amount, setAmount] = useState<string>('')
  const [asset, setAsset] = useState<string>('XLM')
  const [durationDays, setDurationDays] = useState<number>(90)
  const [maxLossPercent, setMaxLossPercent] = useState<number>(100)

  // Mock available balance - in real app, this would come from wallet/API
  const availableBalance = 10000

  // Derived values based on commitment parameters
  const earlyExitPenalty = useMemo(() => {
    const penalty = commitmentType === 'aggressive' ? 5 : commitmentType === 'balanced' ? 3 : 2
    return `${(Number(amount) || 0) * penalty / 100} ${asset}`
  }, [amount, asset, commitmentType])

  const estimatedFees = useMemo(() => {
    // Simple fee calculation - in real app, this would be more complex
    return `0.00 ${asset}`
  }, [asset])

  // Validation
  const amountError = useMemo(() => {
    const numAmount = Number(amount)
    if (amount && numAmount <= 0) return 'Amount must be greater than 0'
    if (numAmount > availableBalance) return 'Amount exceeds available balance'
    return undefined
  }, [amount, availableBalance])

  const isStep2Valid = useMemo(() => {
    const numAmount = Number(amount)
    return (
      numAmount > 0 &&
      numAmount <= availableBalance &&
      durationDays >= 1 &&
      durationDays <= 365 &&
      maxLossPercent >= 0 &&
      maxLossPercent <= 100
    )
  }, [amount, availableBalance, durationDays, maxLossPercent])

  const maxLossWarning = maxLossPercent > 80

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step)
    }
  }

  const handleSubmit = () => {
    console.log('Creating commitment:', {
      type: commitmentType,
      amount,
      asset,
      durationDays,
      maxLossPercent,
    })
    alert('Commitment creation will be implemented here')
  }

  return (
    <main id="main-content" className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <Link href="/" className={styles.backLink} aria-label="Back to Home">
          ← Back
        </Link>
        <h1 className={styles.pageTitle}>Create Commitment</h1>
        <p className={styles.pageSubtitle}>
          Define your liquidity commitment with explicit rules and guarantees
        </p>
      </header>

      {/* Stepper */}
      <nav className={styles.stepper} aria-label="Progress">
        <div className={styles.stepperTrack}>
          {/* Step 1 */}
          <div className={`${styles.step} ${currentStep > 1 ? styles.completed : ''} ${currentStep === 1 ? styles.active : ''}`}>
            <div className={styles.stepCircle}>
              {currentStep > 1 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                '1'
              )}
            </div>
            <span className={styles.stepLabel}>Select Type</span>
          </div>

          {/* Connector */}
          <div className={`${styles.stepConnector} ${currentStep > 1 ? styles.completedConnector : ''}`} />

          {/* Step 2 */}
          <div className={`${styles.step} ${currentStep > 2 ? styles.completed : ''} ${currentStep === 2 ? styles.active : ''}`}>
            <div className={styles.stepCircle}>
              {currentStep > 2 ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                '2'
              )}
            </div>
            <span className={styles.stepLabel}>Configure</span>
          </div>

          {/* Connector */}
          <div className={`${styles.stepConnector} ${currentStep > 2 ? styles.completedConnector : ''}`} />

          {/* Step 3 */}
          <div className={`${styles.step} ${currentStep === 3 ? styles.active : ''}`}>
            <div className={styles.stepCircle}>3</div>
            <span className={styles.stepLabel}>Review</span>
          </div>
        </div>
      </nav>

      {/* Step Content */}
      <div className={styles.stepContent}>
        {currentStep === 1 && (
          <div className={styles.step1Content}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Select Type</h2>
              <p className={styles.sectionSubtitle}>Choose a commitment type that matches your risk profile</p>
            </div>
            <div className={styles.typeSelector}>
              <button
                type="button"
                className={`${styles.typeButton} ${commitmentType === 'safe' ? styles.active : ''}`}
                onClick={() => setCommitmentType('safe')}
                aria-pressed={commitmentType === 'safe'}
              >
                <h3>Safe Commitment</h3>
                <p>Duration: 30 days</p>
                <p>Max loss: 2%</p>
                <p>Lower but stable yield</p>
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${commitmentType === 'balanced' ? styles.active : ''}`}
                onClick={() => setCommitmentType('balanced')}
                aria-pressed={commitmentType === 'balanced'}
              >
                <h3>Balanced Commitment</h3>
                <p>Duration: 60 days</p>
                <p>Max loss: 8%</p>
                <p>Medium yield</p>
              </button>
              <button
                type="button"
                className={`${styles.typeButton} ${commitmentType === 'aggressive' ? styles.active : ''}`}
                onClick={() => setCommitmentType('aggressive')}
                aria-pressed={commitmentType === 'aggressive'}
              >
                <h3>Aggressive Commitment</h3>
                <p>Duration: 90 days</p>
                <p>No loss protection</p>
                <p>Highest yield potential</p>
              </button>
            </div>
            <div className={styles.step1Actions}>
              <button
                type="button"
                className={styles.continueButton}
                onClick={handleNext}
              >
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <CreateCommitmentStepConfigure
            amount={amount}
            asset={asset}
            availableBalance={availableBalance}
            durationDays={durationDays}
            maxLossPercent={maxLossPercent}
            earlyExitPenalty={earlyExitPenalty}
            estimatedFees={estimatedFees}
            isValid={isStep2Valid}
            onChangeAmount={setAmount}
            onChangeAsset={setAsset}
            onChangeDuration={setDurationDays}
            onChangeMaxLoss={setMaxLossPercent}
            onBack={handleBack}
            onNext={handleNext}
            amountError={amountError}
            maxLossWarning={maxLossWarning}
          />
        )}

        {currentStep === 3 && (
          <div className={styles.step3Content}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Review & Confirm</h2>
              <p className={styles.sectionSubtitle}>Review your commitment details before submitting</p>
            </div>
            <div className={styles.reviewSummary}>
              <div className={styles.reviewRow}>
                <span className={styles.reviewLabel}>Commitment Type</span>
                <span className={styles.reviewValue}>{commitmentType}</span>
              </div>
              <div className={styles.reviewRow}>
                <span className={styles.reviewLabel}>Amount</span>
                <span className={styles.reviewValue}>{amount} {asset}</span>
              </div>
              <div className={styles.reviewRow}>
                <span className={styles.reviewLabel}>Duration</span>
                <span className={styles.reviewValue}>{durationDays} days</span>
              </div>
              <div className={styles.reviewRow}>
                <span className={styles.reviewLabel}>Maximum Loss</span>
                <span className={styles.reviewValue}>{maxLossPercent}%</span>
              </div>
              <div className={styles.reviewRow}>
                <span className={styles.reviewLabel}>Early Exit Penalty</span>
                <span className={styles.reviewValue}>{earlyExitPenalty}</span>
              </div>
              <div className={styles.reviewRow}>
                <span className={styles.reviewLabel}>Estimated Fees</span>
                <span className={styles.reviewValue}>{estimatedFees}</span>
              </div>
            </div>
            <div className={styles.step3Actions}>
              <button
                type="button"
                className={styles.backButton}
                onClick={handleBack}
              >
                Back
              </button>
              <button
                type="button"
                className={styles.submitButton}
                onClick={handleSubmit}
              >
                Create Commitment
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

