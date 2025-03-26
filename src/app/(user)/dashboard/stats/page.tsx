/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserUrls } from "@/server/actions/urls/get-user-urls";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  Area,
  AreaChart,
  ComposedChart,
  Line,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  clicks: number;
}

export default function StatsPage() {
  const { data: session, status } = useSession();
  const [userUrls, setUserUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }

    if (status === "authenticated" && session?.user?.id) {
      const fetchUserUrls = async () => {
        try {
          if (!session?.user?.id) return;
          const response = await getUserUrls(session.user.id);
          if (response.success && response.data) {
            setUserUrls(response.data);
          }
        } catch (error) {
          console.error("Error fetching user URLs", error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserUrls();
    }
  }, [session, status]);

  // calculate total clicks
  const totalClicks = userUrls.reduce((sum, url) => sum + url.clicks, 0);

  // calculate average clicks per URL
  const avgClicks =
    userUrls.length > 0
      ? Math.round((totalClicks / userUrls.length) * 10) / 10
      : 0;

  // get top performing URL
  const topUrls = [...userUrls].sort((a, b) => b.clicks - a.clicks).slice(0, 5);

  // prepare data for the bar chart with numeric values
  const barChartData = useMemo(() => {
    return topUrls.map((url, index) => ({
      url: url.shortCode,
      clicks: url.clicks,
      originalUrl: url.originalUrl,
    }));
  }, [topUrls]);

  // prepare data for the pie chart with numeric values
  const pieChartData = useMemo(() => {
    return topUrls.map((url, index) => ({
      browser: url.shortCode,
      visitors: url.clicks,
      fill: `hsl(var(--chart-${index + 1}))`,
    }));
  }, [topUrls]);

  // bar chart config
  const barChartConfig = {
    clicks: {
      label: "Clicks",
      color: "hsl(var(--chart-1))",
    },
    ...topUrls.reduce((acc, url, index) => {
      acc[url.shortCode] = {
        label: url.shortCode,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  // pie chart config
  const pieChartConfig = {
    visitors: {
      label: "Clicks",
    },
    ...topUrls.reduce((acc, url, index) => {
      acc[url.shortCode] = {
        label: url.shortCode,
        color: `hsl(var(--chart-${index + 1}))`,
      };
      return acc;
    }, {} as ChartConfig),
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">URL Statistics</h1>

      <div className="grid gap-8 md:grid-cols-3 mb-8">
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total URLs</CardTitle>
            <CardDescription>Number of URLs you&apos;ve created</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userUrls.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total Clicks</CardTitle>
            <CardDescription>Total clicks across all URLs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalClicks}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Average Clicks</CardTitle>
            <CardDescription>Average clicks per URL</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{avgClicks}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Top Performing URLs</CardTitle>
          <CardDescription>Top 5 URLs with most clicks</CardDescription>
        </CardHeader>
        <CardContent>
          {barChartData.length > 0 ? (
            <Tabs defaultValue="bar" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                <TabsTrigger value="combined">Combined Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="bar" className="min-h-[400px] mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>URL Performance</CardTitle>
                    <CardDescription>Top 5 URLs with most clicks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={barChartConfig}>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={barChartData}>
                          <defs>
                            {barChartData.map((entry, index) => (
                              <linearGradient
                                key={`gradient-${index}`}
                                id={`gradient-${index}`}
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="0%"
                                  stopColor={`hsl(var(--chart-${index + 1}))`}
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="100%"
                                  stopColor={`hsl(var(--chart-${index + 1}))`}
                                  stopOpacity={0.3}
                                />
                              </linearGradient>
                            ))}
                          </defs>
                          <CartesianGrid
                            stroke="hsl(var(--border))"
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="url"
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            tick={{ fill: 'hsl(var(--foreground))' }}
                          />
                          <ChartTooltip
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            content={
                              <ChartTooltipContent
                                indicator="line"
                                labelFormatter={(label) => `URL: ${label}`}
                              />
                            }
                          />
                          <Bar
                            dataKey="clicks"
                            radius={[8, 8, 0, 0]}
                            maxBarSize={60}
                            animationDuration={2000}
                            animationEasing="ease-in-out"
                          >
                            {barChartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={`url(#gradient-${index})`}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                      {avgClicks > 5 ? (
                        <>
                          Trending up by {((avgClicks / 5) * 100).toFixed(1)}%
                          this month{" "}
                          <TrendingUp className="size-4 text-green-500" />
                        </>
                      ) : (
                        <>
                          Could improve with only {5 - avgClicks} more clicks{" "}
                          <TrendingDown className="size-4 text-amber-500" />
                        </>
                      )}
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing click count for your top {topUrls.length} URLs
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="pie" className="min-h-[400px] mt-4">
                <Card className="flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>URL Clicks Distribution</CardTitle>
                    <CardDescription>
                      Top {topUrls.length} URLs with most clicks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={pieChartConfig}
                      className="mx-auto aspect-square max-h-[350px]"
                    >
                      <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                          />
                          <Pie
                            data={pieChartData}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius="60%"
                            outerRadius="85%"
                            strokeWidth={2}
                            paddingAngle={2}
                            animationBegin={0}
                            animationDuration={1500}
                            startAngle={90}
                            endAngle={-270}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.fill}
                                stroke="hsl(var(--background))"
                              />
                            ))}
                            <Label
                              content={({ viewBox }) => {
                                const safeViewBox = viewBox as { cx: number; cy: number };
                                return safeViewBox.cx && safeViewBox.cy ? (
                                  <text
                                    x={safeViewBox.cx}
                                    y={safeViewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={safeViewBox.cx}
                                      y={safeViewBox.cy - 10}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {totalClicks.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={safeViewBox.cx}
                                      y={safeViewBox.cy + 15}
                                      className="fill-muted-foreground text-sm"
                                    >
                                      Total Clicks
                                    </tspan>
                                  </text>
                                ) : null;
                              }}
                            />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      {userUrls.length > 0 && (
                        <>
                          {avgClicks > 5 ? (
                            <>
                              Trending up by{" "}
                              {((avgClicks / 5) * 100).toFixed(1)}% this month{" "}
                              <TrendingUp className="size-4 text-green-500" />
                            </>
                          ) : (
                            <>
                              Could improve with only {5 - avgClicks} more
                              clicks{" "}
                              <TrendingDown className="size-4 text-amber-500" />
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing click count for your top {topUrls.length} URLs
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="combined" className="min-h-[400px] mt-4">
  <Card className="bg-gradient-to-br from-background via-background/50 to-background/80">
    <CardHeader>
      <CardTitle className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">
        Advanced Analytics
      </CardTitle>
      <CardDescription>Interactive performance visualization</CardDescription>
    </CardHeader>
    <CardContent className="p-2">
      <ChartContainer config={barChartConfig}>
        <ResponsiveContainer width="100%" height={450}>
          <ComposedChart data={barChartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorfulGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={0.1} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
              opacity={0.1}
            />
            <XAxis
              dataKey="url"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={30}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload, label }) => {
                if (active && payload?.[0]) {
                  const clickValue = Number(payload[0].value);
                  return (
                    <div className="rounded-lg bg-background/95 backdrop-blur-sm shadow-xl border border-border p-3">
                      <p className="text-sm font-medium mb-1">{label}</p>
                      <p className="text-sm text-primary font-medium">
                        {clickValue} clicks
                      </p>
                      <div className="text-xs text-muted-foreground mt-1">
                        {!isNaN(clickValue) && clickValue > avgClicks ? '↗ Above average' : '↘ Below average'}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              fill="url(#areaGradient)"
              strokeWidth={0}
              fillOpacity={0.8}
            />
            <Line
              type="monotone"
              dataKey="clicks"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                stroke: 'hsl(var(--primary))',
                strokeWidth: 2,
                fill: 'hsl(var(--background))',
                r: 5,
                filter: 'url(#glow)'
              }}
              activeDot={{
                stroke: 'hsl(var(--primary))',
                strokeWidth: 3,
                fill: 'hsl(var(--background))',
                r: 7,
                filter: 'url(#glow)'
              }}
            />
            <ReferenceLine
              y={avgClicks}
              label={{
                value: "Average",
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
                position: "right"
              }}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              opacity={0.5}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
    <CardFooter className="flex-col items-start gap-2 text-sm border-t border-border/30 bg-muted/5">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-gradient-to-r from-primary to-secondary animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Real-time performance tracking
          </span>
        </div>
        <div className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Avg. {avgClicks} clicks per URL
        </div>
      </div>
    </CardFooter>
  </Card>
</TabsContent>
            </Tabs>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No URL data available yet. Create some short URLs to see the stats.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
