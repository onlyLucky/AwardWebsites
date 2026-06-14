import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, MousePointerClick, Sparkles } from 'lucide-react'

interface DemoItem {
  title: string
  description: string
  tags: string[]
  path: string
  icon: React.ReactNode
}

const demos: DemoItem[] = [
  {
    title: 'follow.art',
    description:
      'Interactive hero section with SVG letter scaleY animation driven by mouse position, WebGL 3D card stack with floating animation and parallax effect.',
    tags: ['SVG Animation', 'WebGL', 'Three.js', 'Mouse Interaction'],
    path: '/demo/follow-art',
    icon: <MousePointerClick className="h-5 w-5" />,
  },
  // More demos can be added here
]

function Home() {
  return (
    <div className="min-h-screen px-6 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
              Collection
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Award Websites
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A curated collection of interesting website interactions, animations,
            and visual effects. Each demo recreates a specific interaction
            pattern from award-winning websites.
          </p>
        </div>

        {/* Demo List */}
        <div className="space-y-4">
          {demos.map((demo) => (
            <Link key={demo.path} to={demo.path} className="group block">
              <Card className="transition-all hover:shadow-md hover:border-foreground/20 group-hover:translate-y-[-1px]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted">
                        {demo.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base flex items-center gap-1.5">
                          {demo.title}
                          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </CardTitle>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2 leading-relaxed">
                    {demo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5">
                    {demo.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty state hint */}
        {demos.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p>No demos yet. Check back soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
