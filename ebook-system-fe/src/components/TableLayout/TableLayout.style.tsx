import styled, { css } from "styled-components";
import { Table } from "antd";
import { themeGet } from "@styled-system/theme-get";
interface TableStyledProps {
  $userRole?: string;
}

export const TableCustom = styled(Table)<TableStyledProps>`
  background-color: transparent;
  color: ${themeGet("colors.textColor")};

  .ant-table-thead {
    > tr > th {
      background-color: ${themeGet("colors.secondary")} !important;
      color: ${themeGet("colors.textColor")} !important;
      font-weight: 600;
      border-bottom: 1px solid ${themeGet("colors.border")};

      &::before {
        background-color: ${themeGet("colors.border")} !important;
      }
    }
  }

  .ant-table-tbody {
    > tr {
      transition: all 0.3s ease;
    }

    > tr > td {
      background-color: ${themeGet("colors.primary")};
      color: ${themeGet("colors.textColor")};
      border-bottom: 1px solid ${themeGet("colors.border")};
      transition: all 0.3s ease;
    }

    > tr:nth-child(even):not(:hover):not(.ant-table-row-selected) > td {
      background-color: ${themeGet("colors.gray")};
    }

    > tr:hover:not(.ant-table-header-row),
    > tr.ant-table-row-selected {
      > td {
        background-color: ${themeGet("colors.secondary")} !important;
      }

      ${(props) =>
        props.$userRole === "customer" &&
        css`
          > td {
            background-color: ${themeGet("colors.secondary")} !important;

            color: ${themeGet("colors.white")} !important;
            text-shadow: 0 0 5px ${themeGet("colors.highlight")};

            box-shadow: inset 0 0 10px ${themeGet("colors.highlight")};

            border-bottom: 1px solid ${themeGet("colors.highlight")};
            border-top: 1px solid ${themeGet("colors.highlight")};
          }

          > td:first-child {
            border-left: 1px solid ${themeGet("colors.highlight")};
            box-shadow: inset 10px 0 10px -5px ${themeGet("colors.highlight")};
          }
          > td:last-child {
            border-right: 1px solid ${themeGet("colors.highlight")};
            box-shadow: inset -10px 0 10px -5px ${themeGet("colors.highlight")};
          }
        `}
    }
  }

  .ant-empty-description {
    color: ${themeGet("colors.textColor")};
  }
  .ant-table-placeholder {
    background-color: ${themeGet("colors.primary")} !important;
    border-color: ${themeGet("colors.border")};
    &:hover > td {
      background-color: ${themeGet("colors.primary")} !important;
    }
  }

  .ant-pagination {
    margin: 16px 0 0 0;

    .ant-pagination-item {
      background-color: transparent;
      border-color: ${themeGet("colors.border")};

      a {
        color: ${themeGet("colors.textColor")};
      }

      &-active {
        border-color: ${themeGet("colors.highlight")};
        background-color: ${themeGet("colors.highlight")};
        a {
          color: ${themeGet("colors.white")};
        }
      }
    }

    .ant-pagination-prev,
    .ant-pagination-next {
      .ant-pagination-item-link {
        background-color: transparent;
        border-color: ${themeGet("colors.border")};
        color: ${themeGet("colors.textColor")};
      }
      &.ant-pagination-disabled .ant-pagination-item-link {
        color: ${themeGet("colors.dark")};
      }
    }

    .ant-pagination-jump-prev,
    .ant-pagination-jump-next {
      .ant-pagination-item-container .ant-pagination-item-ellipsis {
        color: ${themeGet("colors.textColor")};
      }
    }
  }

  .table-row-warning {
    color: ${themeGet("colors.warning")};
    font-weight: 700;
  }

  .table-row-gray {
    text-decoration: line-through;
    color: ${themeGet("colors.dark")};
  }
`;
