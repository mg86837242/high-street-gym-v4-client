import RequireAuth from '../components/layouts/RequireAuth';
import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';

const adminRoutes = [
  {
    index: true,
    async lazy() {
      const { AdminIndex } = await import('../pages/Admin/AdminPanel');
      return { Component: AdminIndex };
    },
    ErrorBoundary: ErrorInfoRefresh,
  },
  {
    path: 'activities',
    async lazy() {
      const { MngActivities } = await import('../pages/Admin/MngActivities');
      return { Component: MngActivities };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      const { getAllActivities } = await import('../api/activities');
      return getAllActivities();
    },
    children: [
      {
        index: true,
        async lazy() {
          const { NewActivity } = await import('../pages/Admin/MngActivities');
          return { Component: NewActivity };
        },
        ErrorBoundary: ErrorInfoRefresh,
      },
      {
        path: 'new',
        ErrorBoundary: ErrorInfoRefresh,
        async action() {
          const { createActivity } = await import('../api/activities');
          return createActivity();
        },
      },
      {
        path: 'new-upload-xml',
        ErrorBoundary: ErrorInfoRefresh,
        async action({ request }) {
          const { createActivityByXML } = await import('../api/activities');
          return createActivityByXML({ request });
        },
      },
      {
        path: ':id/edit',
        async lazy() {
          const { EditActivity } = await import('../pages/Admin/MngActivities');
          return { Component: EditActivity };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader({ params }) {
          const { getActivityById } = await import('../api/activities');
          return getActivityById({ params });
        },
        async action({ params, request }) {
          const { updateActivityById } = await import('../api/activities');
          return updateActivityById({ params, request });
        },
      },
      {
        path: ':id/destroy',
        ErrorBoundary: ErrorInfoRefresh,
        async action({ params }) {
          const { deleteActivityById } = await import('../api/activities');
          return deleteActivityById({ params });
        },
      },
    ],
  },
  {
    Component: () => <RequireAuth permittedRoles={['Admin']} />,
    children: [
      {
        path: 'blogs',
        async lazy() {
          const { MngBlogs } = await import('../pages/Admin/MngBlogs');
          return { Component: MngBlogs };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader() {
          const { getAllBlogs } = await import('../api/blogs');
          return getAllBlogs();
        },
        children: [
          {
            index: true,
            async lazy() {
              const { NewBlog } = await import('../pages/Admin/MngBlogs');
              return { Component: NewBlog };
            },
            ErrorBoundary: ErrorInfoRefresh,
          },
          {
            path: 'new',
            ErrorBoundary: ErrorInfoRefresh,
            async action({ request }) {
              const { createBlog } = await import('../api/blogs');
              return createBlog({ request });
            },
          },
          {
            path: ':id/edit',
            async lazy() {
              const { EditBlog } = await import('../pages/Admin/MngBlogs');
              return { Component: EditBlog };
            },
            ErrorBoundary: ErrorInfoRefresh,
            async loader({ params }) {
              const { getBlogById } = await import('../api/blogs');
              return getBlogById({ params });
            },
            async action({ params, request }) {
              const { updateBlogById } = await import('../api/blogs');
              return updateBlogById({ params, request });
            },
          },
          {
            path: ':id/destroy',
            ErrorBoundary: ErrorInfoRefresh,
            async action({ params }) {
              const { deleteBlogById } = await import('../api/blogs');
              return deleteBlogById({ params });
            },
          },
        ],
      },
      {
        path: 'members',
        async lazy() {
          const { MngMembers } = await import('../pages/Admin/MngMembers');
          return { Component: MngMembers };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader() {
          const { getAllMembersWithDetails } = await import('../api/members');
          return getAllMembersWithDetails();
        },
        children: [
          {
            index: true,
            async lazy() {
              const { NewMember } = await import('../pages/Admin/MngMembers');
              return { Component: NewMember };
            },
            ErrorBoundary: ErrorInfoRefresh,
          },
          {
            path: 'new',
            ErrorBoundary: ErrorInfoRefresh,
            async action({ request }) {
              const { createMember } = await import('../api/members');
              return createMember({ request });
            },
          },
          {
            path: 'new-upload-xml',
            ErrorBoundary: ErrorInfoRefresh,
            async action({ request }) {
              const { createMemberByXML } = await import('../api/members');
              return createMemberByXML({ request });
            },
          },
          {
            path: ':id/edit',
            async lazy() {
              const { EditMember } = await import('../pages/Admin/MngMembers');
              return { Component: EditMember };
            },
            ErrorBoundary: ErrorInfoRefresh,
            async loader({ params }) {
              const { getMemberWithDetailsById } = await import('../api/members');
              return getMemberWithDetailsById({ params });
            },
            async action({ params, request }) {
              const { updateMemberWithDetailsById } = await import('../api/members');
              return updateMemberWithDetailsById({ params, request });
            },
          },
          {
            path: ':id/destroy',
            ErrorBoundary: ErrorInfoRefresh,
            async action({ params }) {
              const { deleteMemberById } = await import('../api/members');
              return deleteMemberById({ params });
            },
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
