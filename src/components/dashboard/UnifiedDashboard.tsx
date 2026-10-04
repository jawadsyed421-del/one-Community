import React from 'react';
import { 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Award, 
  Flame, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  MapPin, 
  Play, 
  Send, 
  TrendingUp,
  FileCheck2,
  Users
} from 'lucide-react';
import { UserProfile, Course, Job, CommunityEvent, JobApplication } from '../../types';

interface UnifiedDashboardProps {
  user: UserProfile;
  courses: Course[];
  jobs: Job[];
  events: CommunityEvent[];
  applications: JobApplication[];
  onNavigate: (tab: string) => void;
  onSelectCourse: (course: Course) => void;
  onSelectJob: (job: Job) => void;
  onSelectEvent: (event: CommunityEvent) => void;
  onOpenLiveGame: () => void;
}

export const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({
  user,
  courses,
  jobs,
  events,
  applications,
  onNavigate,
  onSelectCourse,
  onSelectJob,
  onSelectEvent,
  onOpenLiveGame
}) => {
  const primaryCourse = courses[0];
  const registeredEvents = events.filter(e => e.isRegistered);
  const activeApplications = applications.filter(a => a.status !== 'Rejected');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Personalized Greeting & Streak Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 blur-[90px] pointer-events-none rounded-full" />

        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40"
            referrerPolicy="no-referrer"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-mono">Assalamu Alaikum,</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 capitalize">
                {user.role} Active
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {user.name}
            </h1>
            <p className="text-xs text-neutral-400 max-w-md truncate">
              {user.headline}
            </p>
          </div>
        </div>

        {/* Learning Streak & Community Points */}
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[110px]">
            <div className="flex items-center justify-center gap-1 text-amber-400 font-mono text-xl font-bold">
              <Flame className="w-5 h-5 fill-amber-400/20" />
              <span>{user.streakDays}</span>
            </div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Day Streak</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 text-center min-w-[110px]">
            <p className="font-mono text-xl font-bold text-emerald-400">1,690</p>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Quiz Points</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Summary Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        
        <div 
          onClick={() => onNavigate('education')}
          className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase">Education</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-mono text-2xl font-bold text-white">4</p>
          <p className="text-[11px] text-neutral-400 mt-1">Enrolled Courses · 1 Completed</p>
        </div>

        <div 
          onClick={() => onNavigate('jobs')}
          className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase">Job Pipeline</span>
            <Briefcase className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-mono text-2xl font-bold text-white">{applications.length}</p>
          <p className="text-[11px] text-neutral-400 mt-1">1 Shortlisted · 1 Interview</p>
        </div>

        <div 
          onClick={() => onNavigate('events')}
          className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-purple-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold text-purple-400 uppercase">Community RSVP</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <p className="font-mono text-2xl font-bold text-white">{registeredEvents.length}</p>
          <p className="text-[11px] text-neutral-400 mt-1">Next: Mughal Masjid (Oct 10)</p>
        </div>

        <div 
          onClick={onOpenLiveGame}
          className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-semibold text-amber-400 uppercase">Live Quiz Bowl</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-mono text-2xl font-bold text-amber-300">#2 Rank</p>
          <p className="text-[11px] text-neutral-400 mt-1">128 Live Players in Lobby</p>
        </div>

      </div>

      {/* Main Command Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Learning & Career Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: CONTINUE LEARNING */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <h2 className="font-display text-base font-bold text-white">Continue Learning</h2>
              </div>
              <button
                onClick={() => onNavigate('education')}
                className="text-xs text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>View All Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {primaryCourse && (
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider">
                    {primaryCourse.qualification} · {primaryCourse.category}
                  </span>
                  <h3 className="font-semibold text-white text-sm">
                    {primaryCourse.title}
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Next up: <strong>Module 03: Distributed Systems & Kafka Workflows</strong>
                  </p>

                  <div className="w-full max-w-sm pt-2">
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                      <span>Progress</span>
                      <span className="font-mono text-emerald-400 font-medium">{primaryCourse.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${primaryCourse.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectCourse(primaryCourse)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-neutral-950 font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-neutral-950" />
                  <span>Resume Module</span>
                </button>
              </div>
            )}
          </div>

          {/* SECTION 2: CAREER PIPELINE & HIGH-MATCH JOBS */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <h2 className="font-display text-base font-bold text-white">Recommended Opportunities & Status</h2>
              </div>
              <button
                onClick={() => onNavigate('jobs')}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Browse Jobs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {jobs.slice(0, 2).map((job) => (
                <div
                  key={job.id}
                  onClick={() => onSelectJob(job)}
                  className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800/90 hover:border-amber-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-white">{job.title}</h4>
                      <span className="font-mono text-[10px] text-emerald-400">
                        {job.matchPercentage}% Match
                      </span>
                    </div>
                    <p className="text-neutral-400">{job.company} · {job.location} ({job.workplaceType})</p>
                  </div>

                  <span className="font-mono text-neutral-200 font-semibold">{job.salary}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: RECENT COMMUNITY ACTIVITY FEED */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-neutral-800">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <h2 className="font-display text-base font-bold text-white">Recent Community Activity</h2>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">Earned Verified Certificate</p>
                  <p className="text-neutral-400 text-[11px]">Financial Literacy & Halal Wealth Building (Grade: Excellence 96%)</p>
                  <span className="text-[10px] text-neutral-500 font-mono">1 week ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <Send className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">Application Moved to Shortlist</p>
                  <p className="text-neutral-400 text-[11px]">Apex Digital Systems for Senior Frontend Engineer role</p>
                  <span className="text-[10px] text-neutral-500 font-mono">2 days ago</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-200">Registered for Annual Central Majlis</p>
                  <p className="text-neutral-400 text-[11px]">Mughal Masjid (Masjid-e-Irani), South Mumbai</p>
                  <span className="text-[10px] text-neutral-500 font-mono">Yesterday</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Upcoming Events & Quick Navigation */}
        <div className="space-y-6">
          
          {/* Upcoming Registered Events */}
          <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <h2 className="font-display text-base font-bold text-white">Upcoming Programs</h2>
              </div>
              <button
                onClick={() => onNavigate('events')}
                className="text-xs text-purple-400 hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-3">
              {events.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-purple-500/40 cursor-pointer space-y-1.5 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-purple-400 text-[10px]">{evt.date}</span>
                    <span className="px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 text-[9px] font-mono">
                      {evt.type}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-white leading-snug">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-neutral-500" />
                    <span>{evt.venue}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
            <h3 className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
              Quick Shortcuts
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => onNavigate('profile')}
                className="w-full p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800/80 text-left text-xs text-neutral-200 flex items-center justify-between"
              >
                <span>Update Resume & Skills</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>
              <button
                onClick={onOpenLiveGame}
                className="w-full p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800/80 text-left text-xs text-amber-300 flex items-center justify-between"
              >
                <span>Live Multiplayer Quiz Bowl</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[9px] font-mono">LIVE</span>
              </button>
              <button
                onClick={() => onNavigate('education')}
                className="w-full p-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800/80 text-left text-xs text-neutral-200 flex items-center justify-between"
              >
                <span>Browse New Courses</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
