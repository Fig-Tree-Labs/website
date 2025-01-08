'use client'

import { Card, CardContent } from "./ui/card";

export default function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="mb-4 inline-block p-3 bg-primary/20 rounded-lg">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}