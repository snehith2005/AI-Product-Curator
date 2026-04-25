import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, CheckCircle2, XCircle, Loader2, Shield, User } from 'lucide-react';
import { useUsers } from '@/hooks/useAuth';

export default function AdminUsers() {
  const { data, isLoading, error } = useUsers();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="max-w-2xl">
            <Badge className="mb-4 px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300 border-0">
              <Users className="h-3 w-3 mr-1" />
              Admin
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">User Management</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              View and manage all registered users in the system.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Users Table */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold">All Users</h2>
            {data && (
              <Badge variant="secondary" className="rounded-full px-4">
                {data.total} total
              </Badge>
            )}
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-white/10">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center py-12 text-destructive">
                Failed to load users. Please try again.
              </div>
            ) : data?.users.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                No users found.
              </div>
            ) : (
              <div className="rounded-2xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Last Login</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.first_name} {user.last_name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.role === 'admin'
                                ? 'text-violet-600 border-violet-200 bg-violet-50 dark:bg-violet-950/30'
                                : 'text-blue-600 border-blue-200 bg-blue-50 dark:bg-blue-950/30'
                            }
                          >
                            {user.role === 'admin' ? (
                              <Shield className="h-3 w-3 mr-1" />
                            ) : (
                              <User className="h-3 w-3 mr-1" />
                            )}
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.is_active
                                ? 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30'
                                : 'text-gray-500 border-gray-200 bg-gray-50 dark:bg-gray-900'
                            }
                          >
                            {user.is_active ? (
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {user.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(user.created_at)}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.last_login ? formatDate(user.last_login) : 'Never'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
