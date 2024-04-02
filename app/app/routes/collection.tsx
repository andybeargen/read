import { LoaderFunction } from "@remix-run/node";
import { AuthenticatedLayout } from "~/components/AuthenticatedLayout";
import { authenticator } from "~/utils/auth.server";
import { getUserCritters } from "~/models/critter.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function CollectionRoute() {
  const { critters } = useLoaderData();

  return (
    <AuthenticatedLayout>
      <Box
        sx={{
          minHeight: '100vh',
          color: '#000',
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, color: '#3f51b5', textAlign: 'center', fontWeight: 'bold' }}>
          Critter Collection
        </Typography>
        <Grid container spacing={2}>
          {critters.map((critter) => (
            <Grid item xs={12} sm={6} md={4} key={critter.id}>
              <Card sx={{ 
                backgroundImage: 'linear-gradient(to right, #FFCC80, #80D8FF)', 
                border: '1px solid #ccc', 
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', 
                borderRadius: '15px',
                padding: '1rem'
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img 
                      src={`/critters/${critter.critter.image}`} 
                      alt={critter.critter.name} 
                      style={{ maxWidth: '100px', maxHeight: '100px' }}
                    />
                  </Box>
                  <Typography variant="h5" sx={{ mt: 2 }}>
                    {critter.critter.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Type: {critter.critter.type}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {critter.critter.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </AuthenticatedLayout>
  );
}

// detect if user is logged in
export const loader: LoaderFunction = async ({ request }) => {
  // if the user is authenticated, redirect to /dashboard
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });
  if (user instanceof Error || !user) {
    return redirect("/");
  }
 // get all the user's critters
  const critters = await getUserCritters(user.id);
  if (critters.length === 0) {
    return redirect("/select-critter");
  }
  return { critters };
};
