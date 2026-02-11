const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

export async function fetchDashboard(projectId: string) {
    const res = await fetch(`${API_URL}/graphql`, {
        method: 'POST',
        headers: {
                "Content-Type": "application/json",
            },
        body: JSON.stringify({
            query: `
                query Dashboard($projectId: String!) {
                    dashboardOverview(projectId: $projectId) {
                        costs {
                            serviceName
                            totalCostUSD
                        }
                            metrics {
                                type
                                value
                            }
                        }
                    }
                `,
                variables: { projectId },
            }),
            cache: 'no-store',
        });

        if (!res.ok) {
            const text = await res.text();
            console.error('GraphQL error response:', text);
            throw new Error(`GraphQL HTTP ${res.status}: ${text}`);
        }

        const json = await res.json();

        if (json.errors) {
            console.error('GraphQL excution errors:', json.errors);
            throw new Error('GraphQL execution failed');
        }
    

    return json.data.dashboardOverview;
}
