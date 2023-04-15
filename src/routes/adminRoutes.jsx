import ErrorInfoRefresh from '../components/ui/ErrorInfoRefresh';
import ErrorInfoBack from '../components/ui/ErrorInfoBack';
import RequireAuth from '../components/layouts/RequireAuth';

const adminRoutes = [
  {
    index: true,
    async lazy() {
      let { AdminIndex } = await import('../pages/Admin/AdminPanel');
      return { Component: AdminIndex };
    },
    ErrorBoundary: ErrorInfoBack,
  },
  {
    path: 'activities',
    async lazy() {
      let { MngActivities } = await import('../pages/Admin/MngActivities');
      return { Component: MngActivities };
    },
    ErrorBoundary: ErrorInfoRefresh,
    async loader() {
      let { getAllActivities } = await import('../api/activities');
      return getAllActivities();
    },
    children: [
      {
        index: true,
        async lazy() {
          let { NewActivity } = await import('../pages/Admin/MngActivities');
          return { Component: NewActivity };
        },
        ErrorBoundary: ErrorInfoRefresh,
      },
      {
        path: 'new',
        ErrorBoundary: ErrorInfoBack,
        async action() {
          let { createActivity } = await import('../api/activities');
          return createActivity();
        },
      },
      {
        path: 'new-upload-xml',
        ErrorBoundary: ErrorInfoBack,
        async action({ request }) {
          let { createActivityByXML } = await import('../api/activities');
          return createActivityByXML({ request });
        },
      },
      {
        path: ':id/edit',
        async lazy() {
          let { EditActivity } = await import('../pages/Admin/MngActivities');
          return { Component: EditActivity };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader({ params }) {
          let { getActivityById } = await import('../api/activities');
          return getActivityById({ params });
        },
        async action({ params, request }) {
          let { updateActivityById } = await import('../api/activities');
          return updateActivityById({ params, request });
        },
      },
      {
        path: ':id/destroy',
        ErrorBoundary: ErrorInfoBack,
        async action({ params }) {
          let { deleteActivityById } = await import('../api/activities');
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
          let { MngBlogs } = await import('../pages/Admin/MngBlogs');
          return { Component: MngBlogs };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader() {
          let { getAllBlogs } = await import('../api/blogs');
          return getAllBlogs();
        },
        children: [
          {
            index: true,
            async lazy() {
              let { NewBlog } = await import('../pages/Admin/MngBlogs');
              return { Component: NewBlog };
            },
            ErrorBoundary: ErrorInfoRefresh,
          },
          {
            path: 'new',
            ErrorBoundary: ErrorInfoBack,
            async action({ request }) {
              let { createBlog } = await import('../api/blogs');
              return createBlog({ request });
            },
          },
          {
            path: ':id/edit',
            async lazy() {
              let { EditBlog } = await import('../pages/Admin/MngBlogs');
              return { Component: EditBlog };
            },
            ErrorBoundary: ErrorInfoBack,
            async loader({ params }) {
              let { getBlogById } = await import('../api/blogs');
              return getBlogById({ params });
            },
            async action({ params, request }) {
              let { updateBlogById } = await import('../api/blogs');
              return updateBlogById({ params, request });
            },
          },
          {
            path: ':id/destroy',
            ErrorBoundary: ErrorInfoBack,
            async action({ params }) {
              let { deleteBlogById } = await import('../api/blogs');
              return deleteBlogById({ params });
            },
          },
        ],
      },
      {
        path: 'members',
        async lazy() {
          let { MngMembers } = await import('../pages/Admin/MngMembers');
          return { Component: MngMembers };
        },
        ErrorBoundary: ErrorInfoRefresh,
        async loader() {
          let { getAllMembersWithDetails } = await import('../api/members');
          return getAllMembersWithDetails();
        },
        children: [
          {
            index: true,
            async lazy() {
              let { NewMember } = await import('../pages/Admin/MngMembers');
              return { Component: NewMember };
            },
            ErrorBoundary: ErrorInfoRefresh,
          },
          {
            path: 'new',
            ErrorBoundary: ErrorInfoBack,
            async action({ request }) {
              let { createMember } = await import('../api/members');
              return createMember({ request });
            },
          },
          {
            path: 'new-upload-xml',
            ErrorBoundary: ErrorInfoBack,
            async action({ request }) {
              let { createMemberByXML } = await import('../api/members');
              return createMemberByXML({ request });
            },
          },
          {
            path: ':id/edit',
            async lazy() {
              let { EditMember } = await import('../pages/Admin/MngMembers');
              return { Component: EditMember };
            },
            ErrorBoundary: ErrorInfoRefresh,
            async loader({ params }) {
              let { getMemberWithDetailsById } = await import('../api/members');
              return getMemberWithDetailsById({ params });
            },
            async action({ params, request }) {
              let { updateMemberWithDetailsById } = await import('../api/members');
              return updateMemberWithDetailsById({ params, request });
            },
          },
          {
            path: ':id/destroy',
            ErrorBoundary: ErrorInfoBack,
            async action({ params }) {
              let { deleteMemberById } = await import('../api/members');
              return deleteMemberById({ params });
            },
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
