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
  XAxis,
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

  // prepare data for the pie chart with numerc values
  const pieChartData = useMemo(() => {
    return topUrls.map((url, index) => ({
      browser: url.shortCode,
      vistors: url.clicks,
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
            <CardDescription>Number of URLs you've created</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{userUrls.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>Total Clicks</CardTitle>
            <CardDescription>Total clicks acroos all URLs</CardDescription>
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
              </TabsList>
              <TabsContent value="bar" className="min-h-[400px] mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>URL Perfomance</CardTitle>
                    <CardDescription>
                      Top 5 URLs with most clicks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={barChartConfig}>
                      <BarChart accessibilityLayer data={barChartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="url"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={
                            <ChartTooltipContent
                              indicator="dashed"
                              labelFormatter={(label) => `URL: ${label}`}
                            />
                          }
                        />
                        <Bar dataKey={"clicks"} radius={4}>
                          {barChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={`hsl(var(--chart-${index + 1}))`}
                            />
                          ))}
                        </Bar>
                      </BarChart>
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
                          Coudl improve with only {5 - avgClicks} more clicks{" "}
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
                    <CardTitle>URL Clicks Distrubtion</CardTitle>
                    <CardDescription>
                      Top {topUrls.length} URLs with most clicks
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={pieChartConfig}
                      className="mx-auto aspect-square max-h-[350px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={pieChartData}
                          dataKey="vistors"
                          nameKey="browser"
                          innerRadius={60}
                          strokeWidth={5}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline={"middle"}
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {totalClicks.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 20) + 20}
                                      className="fill-muted-foreground text-xs mb-2"
                                    >
                                      Total Clicks
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          ></Label>
                        </Pie>
                      </PieChart>
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
            </Tabs>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No URL data available yet. Create some short URLs to see the
              stats.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
