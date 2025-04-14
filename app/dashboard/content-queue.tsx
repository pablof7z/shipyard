"use client";

import { QueueList } from "@/components/queue-list";
import { useApi } from "@/lib/api";
import type { Post } from "@/types/nostr";

type RawEvent = { content?: string };

export function DashboardContentQueue({ accountPubkey }: { accountPubkey: string }) {
  const { data, error, isLoading } = useApi<{ posts: Post[] }>(
    accountPubkey ? `/api/posts?account_pubkey=${accountPubkey}` : null
  );

  if (isLoading) {
    return <div className="text-center py-8 text-muted-foreground">Loading posts...</div>;
  }
  if (error) {
    return <div className="text-center py-8 text-red-500">Failed to load posts.</div>;
  }

  const posts = data?.posts;

  if (!posts) return null;

  return <QueueList items={posts} />;
}