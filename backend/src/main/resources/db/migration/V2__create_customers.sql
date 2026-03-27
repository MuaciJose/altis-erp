create table customers (
                           id bigserial primary key,
                           tenant_id bigint not null references tenants(id),

                           name varchar(150) not null,
                           email varchar(150),
                           phone varchar(30),

                           document varchar(20),
                           type varchar(20), -- PF / PJ

                           created_at timestamp not null default now(),
                           updated_at timestamp not null default now()
);

create index idx_customers_tenant_id on customers(tenant_id);
create index idx_customers_name on customers(name);