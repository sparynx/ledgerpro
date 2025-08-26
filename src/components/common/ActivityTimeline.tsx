"use client";

import { useState } from 'react';
import Link from 'next/link';

type Event = {
  id: string;
  title: string;
  subtitle?: string;
  timestamp: string;
  details?: string;
  href?: string;
};

export default function ActivityTimeline({ events, isAdmin = false, visibleCount = 5 }: { events: Event[]; isAdmin?: boolean; visibleCount?: number; }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <span className="text-sm text-gray-600">{events.length} items</span>
      </div>

      <div className="relative ml-4">
        {/* vertical line */}
        <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-200" />

        <ul className="space-y-6 pl-4">
          {(expanded ? events : events.slice(0, visibleCount)).map((ev) => (
            <li key={ev.id} className="relative">
              <button
                type="button"
                onClick={() => setOpenId(openId === ev.id ? null : ev.id)}
                className="flex items-start gap-3 w-full text-left"
              >
                <span className={`flex items-center justify-center w-4 h-4 rounded-full ${isAdmin ? 'bg-blue-600' : 'bg-gray-400'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-800">{ev.title}</div>
                      {ev.subtitle && <div className="text-xs text-gray-500">{ev.subtitle}</div>}
                    </div>
                    <div className="text-xs text-gray-400">{new Date(ev.timestamp).toLocaleString()}</div>
                  </div>
                </div>
              </button>

              {openId === ev.id && (
                <div className="mt-3 ml-7 p-3 bg-gray-50 rounded-md border border-gray-100 text-sm text-gray-700">
                  {ev.details && <div className="mb-2">{ev.details}</div>}
                  {ev.href && (
                    <div className="flex gap-2">
                      <Link href={ev.href} className="text-sm text-blue-600 hover:underline">View</Link>
                      {isAdmin && <Link href={ev.href} className="text-sm text-gray-700">Details</Link>}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        {/* show more/less toggle */}
        {events.length > visibleCount && (
          <div className="mt-4 ml-4">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              aria-expanded={expanded}
            >
              <span>{expanded ? 'Show less' : `Show more (${events.length - visibleCount})`}</span>
              <svg
                className={`w-4 h-4 transform ${expanded ? 'rotate-180' : 'rotate-0'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
