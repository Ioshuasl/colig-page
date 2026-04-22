import React, { createContext, useContext, useEffect, useState } from 'react';
import { eventService, memberService, newsService } from '../services';
import type {
  CreateEventInput,
  CreateMemberInput,
  CreateNewsInput,
  Event,
  Member,
  News,
  UpdateEventInput,
  UpdateMemberInput,
  UpdateNewsInput,
} from '../types';

interface DataContextType {
  members: Member[];
  events: Event[];
  news: News[];
  addMember: (member: CreateMemberInput) => Promise<void>;
  updateMember: (id: number, member: UpdateMemberInput) => Promise<void>;
  deleteMember: (id: number) => Promise<void>;
  addEvent: (event: CreateEventInput) => Promise<void>;
  updateEvent: (id: number, event: UpdateEventInput) => Promise<void>;
  deleteEvent: (id: number) => Promise<void>;
  addNews: (newsItem: CreateNewsInput) => Promise<void>;
  updateNews: (id: number, newsItem: UpdateNewsInput) => Promise<void>;
  deleteNews: (id: number) => Promise<void>;
  reloadData: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [news, setNews] = useState<News[]>([]);

  const reloadData = async () => {
    const [membersResponse, eventsResponse, newsResponse] = await Promise.all([
      memberService.findAll(),
      eventService.findAll(),
      newsService.findAll(),
    ]);

    setMembers(membersResponse.data);
    setEvents(eventsResponse.data);
    setNews(newsResponse.data);
  };

  useEffect(() => {
    void reloadData();
  }, []);

  const addMember = async (member: CreateMemberInput) => {
    const created = await memberService.create(member);
    setMembers((prev) => [created, ...prev]);
  };

  const updateMember = async (id: number, member: UpdateMemberInput) => {
    const updated = await memberService.update(id, member);
    setMembers((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const deleteMember = async (id: number) => {
    await memberService.remove(id);
    setMembers((prev) => prev.filter((item) => item.id !== id));
  };

  const addEvent = async (event: CreateEventInput) => {
    const created = await eventService.create(event);
    setEvents((prev) => [created, ...prev]);
  };

  const updateEvent = async (id: number, event: UpdateEventInput) => {
    const updated = await eventService.update(id, event);
    setEvents((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const deleteEvent = async (id: number) => {
    await eventService.remove(id);
    setEvents((prev) => prev.filter((item) => item.id !== id));
  };

  const addNews = async (newsItem: CreateNewsInput) => {
    const created = await newsService.create(newsItem);
    setNews((prev) => [created, ...prev]);
  };

  const updateNews = async (id: number, newsItem: UpdateNewsInput) => {
    const updated = await newsService.update(id, newsItem);
    setNews((prev) => prev.map((item) => (item.id === id ? updated : item)));
  };

  const deleteNews = async (id: number) => {
    await newsService.remove(id);
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <DataContext.Provider value={{
      members, events, news,
      addMember, updateMember, deleteMember,
      addEvent, updateEvent, deleteEvent,
      addNews, updateNews, deleteNews,
      reloadData
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export type { Member, Event, News };
