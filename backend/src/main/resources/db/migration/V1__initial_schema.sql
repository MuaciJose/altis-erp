create table tenants (
                         id bigserial primary key,
                         name varchar(150) not null,
                         document varchar(20) not null unique,
                         status varchar(30) not null,
                         created_at timestamp not null default now(),
                         updated_at timestamp not null default now()
);

create table users (
                       id bigserial primary key,
                       tenant_id bigint not null references tenants(id),
                       name varchar(150) not null,
                       email varchar(150) not null,
                       password_hash varchar(255) not null,
                       active boolean not null default true,
                       last_login_at timestamp null,
                       created_at timestamp not null default now(),
                       updated_at timestamp not null default now(),
                       constraint uq_users_tenant_email unique (tenant_id, email)
);

create table roles (
                       id bigserial primary key,
                       tenant_id bigint not null references tenants(id),
                       name varchar(100) not null,
                       description varchar(255),
                       created_at timestamp not null default now(),
                       updated_at timestamp not null default now(),
                       constraint uq_roles_tenant_name unique (tenant_id, name)
);

create table permissions (
                             id bigserial primary key,
                             code varchar(100) not null unique,
                             description varchar(255)
);

create table user_roles (
                            user_id bigint not null references users(id),
                            role_id bigint not null references roles(id),
                            primary key (user_id, role_id)
);

create table role_permissions (
                                  role_id bigint not null references roles(id),
                                  permission_id bigint not null references permissions(id),
                                  primary key (role_id, permission_id)
);

create table audit_logs (
                            id bigserial primary key,
                            tenant_id bigint null references tenants(id),
                            user_id bigint null references users(id),
                            action varchar(100) not null,
                            module varchar(100) not null,
                            entity_name varchar(100) not null,
                            entity_id varchar(100) null,
                            details text null,
                            ip_address varchar(45) null,
                            created_at timestamp not null default now()
);

create index idx_users_tenant_id on users(tenant_id);
create index idx_roles_tenant_id on roles(tenant_id);
create index idx_audit_logs_tenant_id on audit_logs(tenant_id);
create index idx_audit_logs_user_id on audit_logs(user_id);
create index idx_audit_logs_module on audit_logs(module);