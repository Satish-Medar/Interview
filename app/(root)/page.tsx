import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { getCurrentUser} from '@/lib/actions/auth.action'

import { getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/general.action';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const user = await getCurrentUser();
  if (!user || !user.id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">You must be signed in to view your interviews.</h2>
        <Link href="/sign-in" className="btn-primary mt-4">Sign In</Link>
      </div>
    );
  }

  const [userInterviewsRaw, latestInterviewsRaw] = await Promise.all([
    await getInterviewsByUserId(user.id),
    await getLatestInterviews({ userId: user.id })
  ]);
  const userInterviews = userInterviewsRaw || [];
  const latestInterviews = latestInterviewsRaw || [];

  const hasPastInterviews = userInterviews.length > 0;
  const hasUpcomingInterviews = latestInterviews.length > 0;
  return (
    <>
      <section className="card-cta">
      <div className="flex flex-col gap-6 max-w-lg">
      <h2>Ace Your Interviews with AI-Powered Coaching</h2>
          <p className="text-lg">
          Sharpen your skills with realistic mock interviews and instant smart feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
        {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard
                { ...interview} key={interview.id}/>
            ))) : (
            <p>You haven&apos;t taken any interview yet</p>
          )} 
     
        </div>
      </section>


      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
        {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard
                { ...interview} key={interview.id}/>
            ))) : (
            <p>There are no new interviews available</p>
          )} 
        </div>
      </section>
    </>
  )
}

export default page
